from email import message
from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
# Create your models here.


    # try:
        # Records.full_clean():
    
# def validate_max(input):
#     print('checkong')
#     print(input)
#     print(len(input))
#     if len(input) > 5:
#         print('theres a freakin error')
#         raise ValidationError(
#             _('length is more than 5 characters'), code='invalid'
#         )

class Records(models.Model):
    RecordId = models.AutoField(primary_key=True)
    FirstName = models.CharField(max_length=5) #, validators=[validate_max]
    LastName = models.CharField(max_length=20)
    DateOfBirth = models.DateField()
    Address = models.CharField(max_length=50, blank=True)
    City = models.CharField(max_length=20, blank=True)
    Zipcode = models.CharField(max_length=20, blank=True)
    LandLine = models.CharField(max_length=20, blank=True)
    CellPhone = models.CharField(max_length=20)
    Infected = models.BooleanField(blank=True)
    previousDiseases = models.CharField(max_length=50, blank=True)

    # def __str__(self):
    #     return self.title

    # def clean(self):
    #     # super().clean_fields(exclude=None)
    #     print(self.FirstName)
    #     # if len(self.FirstName) > 2:
    #         #    raise ValidationError({'FirstName': _('length is more than 5 characters')})
    #     super(Records, self).clean()

    # def save(self, *args, **kwargs):
    #     self.full_clean()
    #     super(Records, self).save(*args, **kwargs)
    # # somting = models.CharField(
        # max_length=5,
        #  validators=[validate_max])    
# class LengthValidation(CharField):