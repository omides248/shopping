from django.urls import path

from products.views.product_view import ProductView

urlpatterns = [
    path("products", ProductView.as_view()),
]
