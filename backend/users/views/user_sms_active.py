from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


class UserSmsActive(APIView):

    def post(self, request):
        data = request.data
        phone_number = data.get("phone_number")
        code = data.get("code")

        try:
            user = get_user_model().objects.get(phone_number=phone_number, sms_token=code)
            user.is_active = True
            user.sms_token = None
            user.save()
            res = self.get_tokens_for_user(user)
            res["user_id"] = user.id
        except Exception as e:
            return Response({"error": "phone_number or code is incorrect"}, status=status.HTTP_404_NOT_FOUND)

        return Response(data=res, status=status.HTTP_200_OK)

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
