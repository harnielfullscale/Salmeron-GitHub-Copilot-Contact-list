from django.shortcuts import render

# Create your views here.
# Create a view function that will return a list of contacts using @api_view decorator with validation from serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Contact
from .serializers import ContactSerializer


@api_view(['GET', 'POST'])
def contacts_list(request):
    if request.method == 'GET':
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data, 200)
    elif request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, 200)
        return Response(serializer.errors, 400)

# Create a view function that will return a single contact using @api_view decorator with validation from serializers


@api_view(['GET', 'PUT', 'DELETE'])
def contact_detail(request, pk):
    try:
        contact = Contact.objects.get(pk=pk)
    except Contact.DoesNotExist:
        return Response({'error': 'Contact does not exist'}, status=404)
    if request.method == 'GET':
        serializer = ContactSerializer(contact)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ContactSerializer(contact, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        contact.delete()
        return Response({'message': 'Contact was deleted successfully!'}, status=204)
