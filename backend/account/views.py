from knox.models import AuthToken
from rest_framework import permissions
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.response import Response

from account.serializers import UserCreateSerializer, UserSerializer, UserLoginSerializer


class UserCreateAPIView(GenericAPIView):
    serializer_class = UserCreateSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_data = UserSerializer(user, context=self.get_serializer_context()).data,
        _, token = AuthToken.objects.create(user)
        return Response({
            'user': user_data,
            'token': token
        })


class UserLoginAPIView(GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        user_data = UserSerializer(user, context=self.get_serializer_context()).data
        _, token = AuthToken.objects.create(user)
        return Response({
            'user': user_data,
            'token': token
        })


class UserDetailAPIView(RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
