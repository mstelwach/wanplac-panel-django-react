from django.urls import path, include
from knox.views import LogoutView

from account.views import UserCreateAPIView, UserLoginAPIView, UserDetailAPIView

app_name = 'account'

urlpatterns = [
    path('', include('knox.urls')),
    path('register', UserCreateAPIView.as_view()),
    path('login', UserLoginAPIView.as_view()),
    path('logout', LogoutView.as_view(), name='user-logout'),
    path('user', UserDetailAPIView.as_view()),
]