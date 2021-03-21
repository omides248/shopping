from rest_framework import serializers

from orders.models import OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = OrderItem
