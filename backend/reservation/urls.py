from django.urls import path, include
from rest_framework import routers
from reservation.views import ReservationView, KayakView, RouteView, KayakStockDateView, ReservedKayakView

router = routers.DefaultRouter()
router.register(r'reservations', ReservationView, 'reservation')
router.register(r'kayaks', KayakView, 'kayak')
router.register(r'routes', RouteView, 'route')
router.register(r'kayak-stock-date', KayakStockDateView, 'stock-date')
router.register(r'reserved-kayak', ReservedKayakView, 'reserved-kayak')

app_name = 'reservation'

urlpatterns = [
    path('', include(router.urls))
]