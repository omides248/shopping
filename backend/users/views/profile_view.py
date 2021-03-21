from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from users.serializers.profile_serializer import ProfileRetrieveSerializer, ProfileUpdateSerializer, \
    ProfileDefaultSerializer


class ProfileView(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return get_user_model().objects.filter(id=self.request.user.pk)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ProfileRetrieveSerializer
        elif self.request.method == "PUT":
            return ProfileUpdateSerializer
        return ProfileDefaultSerializer
