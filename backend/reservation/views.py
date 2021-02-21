from django_filters.rest_framework import DjangoFilterBackend
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
    queryset = Reservation.objects.all()
    filter_backends = (DjangoFilterBackend, )
    filterset_fields = ['date']


class ReservedKayakView(ModelViewSet):
    serializer_class = ReservedKayakSerializer
    queryset = ReservedKayak.objects.all()

