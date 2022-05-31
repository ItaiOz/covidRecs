from dataclasses import field
from rest_framework import serializers
from recordsApp.models import Records

class RecordsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Records
        fields = ('RecordId', 'FirstName', 'LastName', 'DateOfBirth', 'Address', 'City', 'Zipcode', 'LandLine', 'CellPhone', 'Infected', 'previousDiseases')