from django.contrib import admin

from orders.models.order import Order
from orders.models.order_item import OrderItem
from django.utils.translation import ugettext_lazy as _


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

    def has_add_permission(self, request, obj):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    row_number = 0

    list_display = (
        "order_number", "phone_number", "full_name", "total_cost",
    )
    sortable_by = ("order_number",)
    list_display_links = ("order_number",)
    readonly_fields = ("order_number", "phone_number", "total_cost", "off", "first_name",
                       "last_name")

    search_fields = ("order_number", "phone_number", "first_name", "last_name")
    list_filter = ("off",)

    inlines = [
        OrderItemInline
    ]

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    full_name.allow_tags = True
    full_name.short_description = _("Full name")

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False
