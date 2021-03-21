from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from users.serializers.user_serializer import UserSerializers


class SignUpView(APIView):

    def post(self, request):
        data = request.data

        serializer = UserSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            res_data = {
                "phone_number": data.get("phone_number"),
                "first_name": data.get("first_name"),
                "last_name": data.get("last_name"),
            }
            return Response(data=res_data, status=status.HTTP_201_CREATED)
        print("11111111111111111111111111111")
        print(serializer.errors)
        return Response(serializer.errors, status=404)
