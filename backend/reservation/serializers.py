from rest_framework import serializers
from reservation.models import Reservation, Kayak, Route, ReservedKayak, KayakStockDate


class KayakSerializer(serializers.ModelSerializer):

    class Meta:
        model = Kayak
        fields = ['id', 'name', 'kind', 'description', 'price', 'image']


class KayakStockDateSerializer(serializers.ModelSerializer):
    kayak = KayakSerializer(read_only=True)

    class Meta:
        model = KayakStockDate
        fields = ['kayak', 'date', 'stock', 'available']


class RouteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Route
        fields = ['id', 'start', 'end', 'length', 'description', 'image']


class ReservedKayakSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReservedKayak
        fields = ['reservation', 'kayak', 'quantity']

    def to_representation(self, instance):
        reserved_kayak = super(ReservedKayakSerializer, self).to_representation(instance)
        reserved_kayak['kayak'] = KayakSerializer(instance.kayak).data
        return reserved_kayak

    def create(self, validated_data):
        instance = super(ReservedKayakSerializer, self).create(validated_data)
        kayak_stock_date = KayakStockDate.objects.get(kayak=instance.kayak, date=instance.reservation.date)

        kayak_stock_date.stock -= instance.quantity
        if not kayak_stock_date.stock:
            kayak_stock_date.available = False
        kayak_stock_date.save()

        return instance


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = ['id', 'first_name', 'last_name', 'phone', 'date', 'time', 'route', 'account', 'kayaks']

    def to_representation(self, instance):
        reservation = super(ReservationSerializer, self).to_representation(instance)
        reservation['route'] = RouteSerializer(instance.route).data
        reservation['kayaks'] = ReservedKayakSerializer(instance.reserved_kayaks.all(), many=True).data
        return reservation