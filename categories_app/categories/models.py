from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=1000)
    level = models.IntegerField(blank=False, null=False, default=0)
    best_offer_enabled = models.BooleanField(default=False, blank=False)
    auto_pay_enabled = models.BooleanField(default=False, blank=False)
    leaf = models.BooleanField(default=False, blank=False)
    lsd = models.BooleanField(default=False, blank=False)
    parent_id = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)

