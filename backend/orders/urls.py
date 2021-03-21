from django.urls import re_path

from orders.views.order_items_view import OrderItemView
from orders.views.order_view import OrderView


urlpatterns = [
    re_path(r'orders/$', OrderView.as_view()),
    re_path(r"orders/(?P<pk>\d+)/items/$", OrderItemView.as_view())
]

