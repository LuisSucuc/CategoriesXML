from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    parent_id = serializers.SerializerMethodField()

    def get_parent_id(self, obj):
        try:
            return obj.parent_id.name
        except:
            return ''
    class Meta:
        model = Category
        fields = '__all__'