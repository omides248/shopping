import re
from random import randint

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models.limit_ip_sms import LimitIPSms


class UserRegisterPhoneNumberView(APIView):

    def post(self, request):
        data = request.data
        phone_number = data.get("phone_number")
        valid_phone_number = self.is_valid_phone_number(phone_number)
        if not valid_phone_number:
            return Response({"error": "phone_number is not valid"})

        ip = self.get_client_ip(request)
        if LimitIPSms.access_send_sms(ip):
            token_sms = randint(1111, 9999)
            try:
                # Send sms code with `code`
                pass
            except Exception as e:
                return Response({"error": f"error send sms: {e}"}, status=status.HTTP_302_FOUND)

            user_obj, created = get_user_model().objects.update_or_create(
                phone_number=phone_number,
                defaults={"sms_token": token_sms, "is_active": False},
            )

            return Response({"message": "Sent sms"}, status=status.HTTP_202_ACCEPTED)

        return Response({"errors": "Waiting for 1 minutes"}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        return x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get("REMOTE_ADDR")

    def is_valid_phone_number(self, phone_number: str = None) -> bool:
        return False if not phone_number or len(re.findall(r"^(?:0|\+98)\d{10}$", phone_number)) == 0 else True
