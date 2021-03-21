from rest_framework import generics
from rest_framework.pagination import PageNumberPagination

from products.models.product import Product
from products.serializers.product_serializer import ProductSerializer


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10000


class ProductView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = None

