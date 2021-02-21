from django.contrib import admin

from reservation.models import ReservedKayak, Reservation, Kayak, Route, KayakStockDate


class ReservedKayakInline(admin.TabularInline):
    model = ReservedKayak
    raw_id_fields = ['kayak']


class ReservationAdmin(admin.ModelAdmin):
    list_display = ['account', 'first_name', 'last_name', 'phone', 'route', 'date', 'time']
    inlines = [ReservedKayakInline]


admin.site.register(Reservation, ReservationAdmin)


class KayakAdmin(admin.ModelAdmin):
    list_display = ['name', 'kind', 'description', 'price']


admin.site.register(Kayak, KayakAdmin)


class KayakStockDateAdmin(admin.ModelAdmin):
    list_display = ['kayak', 'date', 'stock', 'available']


admin.site.register(KayakStockDate, KayakStockDateAdmin)


class RouteAdmin(admin.ModelAdmin):
    list_display = ['start', 'end', 'length', 'description']


admin.site.register(Route, RouteAdmin)
