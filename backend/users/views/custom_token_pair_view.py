from rest_framework_simplejwt.views import TokenObtainPairView

from users.serializers.custome_token_pair_serializer import CustomTokenObtainPairSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
