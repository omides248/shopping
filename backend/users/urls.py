from django.urls import re_path
from rest_framework.routers import DefaultRouter

from users.views.profile_view import ProfileView
from users.views.sign_up_view import SignUpView
from users.views.user_register_phone_number import UserRegisterPhoneNumberView
from users.views.user_sms_active import UserSmsActive

router = DefaultRouter()
router.register("profile", ProfileView, basename="profile-url")

urlpatterns = [
    re_path(r"sign-up$", SignUpView.as_view()),
    re_path(r"sign-up/sms$", UserRegisterPhoneNumberView.as_view()),
    re_path(r"sign-up/sms/active$", UserSmsActive.as_view()),
]
# print(router.urls)
urlpatterns += router.urls
