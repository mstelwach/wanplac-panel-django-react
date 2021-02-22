from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework.viewsets import ModelViewSet

from reservation.models import Reservation, Kayak, Route, KayakStockDate, ReservedKayak
from reservation.serializers import ReservationSerializer, KayakSerializer, RouteSerializer, KayakStockDateSerializer, \
    ReservedKayakSerializer


class KayakView(ModelViewSet):
    serializer_class = KayakSerializer
    queryset = Kayak.objects.all()


class KayakStockDateView(ModelViewSet):
    serializer_class = KayakStockDateSerializer
    queryset = KayakStockDate.objects.all()
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ['date']


class RouteView(ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()


class ReservationView(ModelViewSet):
    serializer_class = ReservationSerializer
    # queryset = Reservation.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ['date']

    def get_queryset(self):
        return self.queryset.filter(account=self.request.user)

    def perform_create(self, serializer):
        serializer.save(account=self.request.user)


class ReservedKayakView(ModelViewSet):
    serializer_class = ReservedKayakSerializer
    queryset = ReservedKayak.objects.all()

