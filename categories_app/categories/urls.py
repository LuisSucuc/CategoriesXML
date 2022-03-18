from django.urls import path, include
from .api_views import ProcessFile, CategoryViewSet
app_name = 'api'
from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('process_file/', ProcessFile.as_view()),
]