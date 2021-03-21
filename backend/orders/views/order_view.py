from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, generics, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from orders.models.order import Order
from orders.models.order_item import OrderItem
from orders.serializers.order_serializer import OrderSerializer
from products.models.product import Product


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000


class OrderView(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = LargeResultsSetPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = []  # Set initiate filter Products
    search_fields = []  # Set initiate search Products
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(phone_number=str(self.request.user.phone_number).replace("+98", "0"))

    def post(self, request, *args, **kwargs):

        # if not request.user.is_authenticated:
        #     return Response(data={"error": "User isn't login"}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data

        if not data:
            return Response(data={"error": "Request body is empty"}, status=status.HTTP_400_BAD_REQUEST)

        if not isinstance(data, list):
            return Response(data={"error": "Request body should be list"}, status=status.HTTP_400_BAD_REQUEST)

        products_obj_list = []
        products_quantity_list = []
        for product in data:
            product_id = product.get("product_id")

            try:
                product_obj = Product.objects.get(id=product_id)

                quantity = product.get("quantity")
                if not quantity:
                    return Response(data={"error": f"product with id {product_id} does not have quantity"}, status=404)

                products_obj_list.append(product_obj)
                products_quantity_list.append(quantity)

            except Product.DoesNotExist:
                return Response(data={"error": f"product with id {product_id} not found"}, status=404)

        # Calculate total cost and total off
        total_cost = 0
        for product_obj, quantity in zip(products_obj_list, products_quantity_list):
            total_cost += product_obj.price * quantity

        # Create Order
        order_obj = Order.objects.create(
            phone_number=str(request.user.phone_number).replace("+98", "0"),
            first_name=request.user.first_name,
            last_name=request.user.last_name,
            total_cost=total_cost
        )

        # Create items for order
        for product_obj, quantity in zip(products_obj_list, products_quantity_list):
            OrderItem.objects.create(
                order=order_obj,
                product=product_obj,
                name=product_obj.name,
                price=product_obj.price,
                off=product_obj.off,
                quantity=quantity,
            )

        return Response(status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):
        self.filterset_fields = ["phone_number"]  # Set field for filter Products
        self.search_fields = ['phone_number']  # Set field for search Products

        # if not request.user.is_authenticated:
        #     return Response(data={"error": "User isn't login"}, status=status.HTTP_401_UNAUTHORIZED)

        queryset = self.filter_queryset(self.get_queryset().order_by("-id"))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
