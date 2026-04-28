from django.db import models
from django.contrib.auth.models import User

class DiseaseSolution(models.Model):
    plant_disease_name = models.CharField(max_length=100, unique=True)
    plant_disease_solution = models.TextField()

    def __str__(self):
        return self.plant_disease_name

class PredictionHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    disease = models.ForeignKey(DiseaseSolution, on_delete=models.CASCADE)
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.disease.plant_disease_name}"