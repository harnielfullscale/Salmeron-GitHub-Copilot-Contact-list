# create a router class that will route the request to the appropriate view
from django.urls import path
from .views import contacts_list, contact_detail

urlpatterns = [
    path('api/contacts/', contacts_list, name='contacts_list'),
    path('api/contact/<int:pk>', contact_detail, name='contact_detail'),
]
