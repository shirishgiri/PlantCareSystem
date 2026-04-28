from django.contrib import admin
from .models import DiseaseSolution
from .models import PredictionHistory

admin.site.register(DiseaseSolution)
admin.site.register(PredictionHistory)
