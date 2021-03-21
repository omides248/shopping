from ckeditor.fields import RichTextField
from django.db import models
from django.utils.translation import ugettext_lazy as _

from products.models.category import Category


class Product(models.Model):
    PRODUCT_SIZES = (
        ("S", _("Small")),
        ("M", _("Medium")),
        ("L", _("Large")),
    )

    category    = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name=_("Category"))
    name        = models.CharField(max_length=50, verbose_name=_("Name"))
    image       = models.ImageField(upload_to="img/public/products/", null=True, blank=True)
    description = RichTextField(null=True, blank=True, verbose_name=_("Description"))
    shirt_size  = models.CharField(max_length=1, choices=PRODUCT_SIZES, null=True, blank=True, default=None, verbose_name=_("Shirt size"))
    price       = models.PositiveIntegerField(verbose_name=_("Price"))
    off         = models.PositiveIntegerField(null=True, blank=True, verbose_name=_("Off"))
    quantity    = models.PositiveIntegerField(null=True, blank=True, verbose_name=_("Quantity"))
    created_at  = models.DateTimeField(auto_now_add=True, verbose_name=_("Created at"))
    updated_at  = models.DateTimeField(auto_now=True, verbose_name=_("Updated at"))

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")
        permissions = [
            ("pem4", "This is pem 4"),
            ("pem5", "This is pem 5")
        ]

    def __str__(self):
        return self.name
