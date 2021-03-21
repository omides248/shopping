from django.contrib.auth import get_user_model
from rest_framework import serializers


class ProfileRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("first_name", "last_name", "phone_number")
        model = get_user_model()


class ProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("first_name", "last_name")
        model = get_user_model()


class ProfileDefaultSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ()
        model = get_user_model()
