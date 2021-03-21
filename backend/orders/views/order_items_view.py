from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from orders.models import OrderItem
from orders.serializers.order_item_serializer import OrderItemSerializer


class OrderItemView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = OrderItemSerializer

    def get_queryset(self):
        return OrderItem.objects.filter(order__phone_number=str(self.request.user.phone_number).replace("+98", "0"),
                                        order__id=self.kwargs.get("pk"))

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
