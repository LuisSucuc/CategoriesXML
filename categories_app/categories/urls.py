from django.urls import path
from .api_views import ProcessFile
app_name = 'api'

urlpatterns = [
    path('process_file/', ProcessFile.as_view()),
]