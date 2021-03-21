from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, password, **extra_fields):
        user = self.model(**extra_fields)
        if not password:
            raise ValueError('Password is None')
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, password=None, **extra_fields):
        print(extra_fields)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(password, **extra_fields)

    def create_superuser(self, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(password, **extra_fields)


class User(AbstractUser):
    username = None
    phone_number = PhoneNumberField(unique=True, verbose_name=_("Phone number"))
    sms_token = models.CharField(verbose_name=_('Sms token'), max_length=5, null=True, blank=True, default=None)

    USERNAME_FIELD = "phone_number"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        permissions = [
            ("pem1", "This is pem 1"),
            ("pem2", "This is pem 2"),
            ("pem3", "This is pem 3")
        ]

    def __str__(self):
        return str(self.phone_number)


