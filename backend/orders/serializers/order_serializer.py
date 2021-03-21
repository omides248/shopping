from rest_framework import serializers

from orders.models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "name", "price", "off", "quantity",)


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, source="orderitem_set")

    class Meta:
        model = Order
        fields = ("id", "order_number", "phone_number", "first_name", "last_name", "total_cost", "order_status", "off",
                  "created_at",
                  "order_items",)
