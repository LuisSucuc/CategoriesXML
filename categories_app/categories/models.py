from django.db import models

# Create your models here.

a = {
	'id': 171786,
	'name': 'Seller Category 5',
	'level': 4,
	'best_offer_enabled': True,
	'auto_pay_enabled': True,
	'leaf': True,
	'lsd': False,
	'parent_id': 171781
}


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000)
    level = models.IntegerField(blank=False, null=False)
    best_offer_enabled = models.BooleanField(default=False, blank=False)
    auto_pay_enabled = models.BooleanField(default=False, blank=False)
    leaf = models.BooleanField(default=False, blank=False)
    lsd = models.BooleanField(default=False, blank=False)
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE)