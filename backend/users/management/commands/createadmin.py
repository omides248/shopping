from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):
        phone_number = "09334448899"
        try:
            get_user_model().objects.get(phone_number=phone_number)
        except Exception as e:
            password = "123123"
            print(f"Creating account for {phone_number}")
            admin = get_user_model().objects.create_superuser(phone_number=phone_number, password=password)
            admin.is_active = True
            admin.is_admin = True
            admin.save()
