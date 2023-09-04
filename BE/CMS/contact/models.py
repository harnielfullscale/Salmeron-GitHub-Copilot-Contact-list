from django.db import models

# Create your models here.
# create a contact model with the following fields: name, email, address, contact_number


class Contact(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name
