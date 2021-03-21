from django.contrib import admin

from products.models.product import Product
from products.models.category import Category

admin.site.register(Product)


@admin.register(Category)
class OrderAdmin(admin.ModelAdmin):
    row_number = 0

    list_display = ("row", "name", "image")

    def row(self, obj):
        count = Category.objects.all().count()
        if self.row_number < count:
            self.row_number += 1
        else:
            self.row_number = 1  # Reset

        return self.row_number
