from django.db import models

from account.models import User


class Kayak(models.Model):
    NUMBER_SEATS = [
        ('1', 'Jednoosobowy'),
        ('2', 'Dwuosobowy'),
        ('3', 'Trzyosobowy'),
        ('4', 'Czteroosobowy')
    ]

    name = models.CharField(max_length=32)
    kind = models.CharField(max_length=32, choices=NUMBER_SEATS)
    description = models.TextField(blank=True)
    price = models.PositiveIntegerField()
    image = models.ImageField(upload_to='kayak', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Model: {} - {} | Price: {} PLN'.format(self.name,
                                                       self.get_kind_display(),
                                                       self.price)


class KayakStockDate(models.Model):
    kayak = models.ForeignKey(Kayak, on_delete=models.CASCADE)
    date = models.DateField()
    stock = models.IntegerField()
    available = models.BooleanField()

    def __str__(self):
        return 'Kayak: {} | Date: {} | Quantity: {}'.format(self.kayak.name,
                                                            self.date,
                                                            self.stock)


class Route(models.Model):
    start = models.CharField(max_length=64)
    end = models.CharField(max_length=64)
    length = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='route', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '{} -> {}'.format(self.start, self.end)


# PAYMENT_METHOD = [
#     ('payu', 'PayU'),
#     ('paypal', 'PayPal'),
#     ('cash', 'Cash Payment'),
# ]
#
# STATUS_BOOKING = [
#     ('unconfirmed', 'Unconfirmed'),
#     ('active', 'Active'),
#     ('completed', 'Completed')
# ]


class Reservation(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)
    phone = models.CharField(max_length=17)
    date = models.DateField()
    time = models.TimeField()
    account = models.ForeignKey(User, related_name='reservations', on_delete=models.CASCADE)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    kayaks = models.ManyToManyField(Kayak, through='ReservedKayak')
    # status = models.CharField(max_length=32, choices=STATUS_BOOKING, default='unconfirmed')
    # payment = models.CharField(max_length=32, choices=PAYMENT_METHOD)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return 'Reservation: {} | Route: {} | Date: {}, {}'.format(self.account,
                                                                   self.route,
                                                                   self.date,
                                                                   self.time)

    def get_total_cost(self):
        return sum(reserved_kayak.get_cost() for reserved_kayak in self.reserved_kayaks.all())


class ReservedKayak(models.Model):
    reservation = models.ForeignKey(Reservation, related_name='reserved_kayaks', on_delete=models.CASCADE)
    kayak = models.ForeignKey(Kayak, on_delete=models.CASCADE)
    quantity = models.IntegerField(choices=[(0, '-------')] + [(number, str(number)) for number in range(1, 25)])

    def get_cost(self):
        return self.kayak.price * self.quantity

# ORDER_STATUS_CHOICES = (("W", "Waiting for payment"), ("P", "Payment complete"))
#
# class Order(models.Model):
#     reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE)
#     total = models.DecimalField(decimal_places=2, max_digits=8)
#     currency = models.CharField(max_length=3, default='PLN')
#     paid = models.BooleanField(default=False)
#     status = models.CharField(
#         max_length=1, blank=True, default="W", choices=ORDER_STATUS_CHOICES
#     )
#
#     def get_description(self):
#         return 'Zamówienie do rezerwacji - {}'.format(self.reservation)
#
#     def get_total_amount(self):
#         return self.total
#
#     def get_currency(self):
#         return self.currency
#
#     def get_absolute_url(self):
#         return reverse("reservation:order-payment-payu", kwargs={"pk": self.pk})
#
#     def get_items(self):
#         return [{
#             'reservation': self.reservation,
#             'quantity_kayak': len(self.reservation.details.all()),
#             'cost': self.get_total_amount(),
#         }]
#
#     def __str__(self):
#         return 'Zamówienie do rezerwacji - {}'.format(self.reservation)
#
#
