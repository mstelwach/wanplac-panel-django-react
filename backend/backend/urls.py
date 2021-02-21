"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from backend import settings
from reservation.views import ReservationView, KayakView, RouteView, KayakStockDateView, ReservedKayakView

router = routers.DefaultRouter()
router.register(r'reservations', ReservationView, 'reservation')
router.register(r'kayaks', KayakView, 'kayak')
router.register(r'routes', RouteView, 'route')
router.register(r'kayak-stock-date', KayakStockDateView, 'stock-date')
router.register(r'reserved-kayak', ReservedKayakView, 'reserved-kayak')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls')),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
