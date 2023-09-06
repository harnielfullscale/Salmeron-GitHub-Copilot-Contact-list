# Create a serializer class for the contact model with validation for name, email, address and contact_number fields

from rest_framework import serializers
from rest_framework import status
from rest_framework.response import Response
from .models import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'name', 'email', 'address', 'contact_number')

    def validate_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError(
                'Name must be at least 2 characters long')
        return value

    def validate_email(self, value):
        if '@' not in value:
            raise serializers.ValidationError('Email must contain @')
        return value

    def validate_address(self, value):
        if len(value) < 10:
            raise serializers.ValidationError(
                'Address must be at least 10 characters long')
        return value

    def validate_contact_number(self, value):
        if len(value) < 10:
            raise serializers.ValidationError(
                'Contact number must be at least 10 characters long')
        return value
