import numpy as np
from PIL import Image
import tensorflow as tf
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .utils import model
from .models import DiseaseSolution, PredictionHistory
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if User.objects.filter(username=username).exists():
        return Response({"error": "User with this username already exists"}, status=400)
    
    user = User.objects.create_user(username=username, email=email, password=password)
    token, _ = Token.objects.get_or_create(user=user)
    
    return Response({"token": token.key, "message": "Registration Successful"})

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "message": "Login Successful"})
    
    return Response({"error": "Invalid Credentials"}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_prediction(request):
    if 'image' not in request.FILES:
        return Response({"error": "No image provided"}, status=400)

    img_file = request.FILES['image']
    img = Image.open(img_file).convert('RGB')
    img = img.resize((224, 224)) 
    img_array = tf.keras.utils.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) 

    processed_img = tf.keras.applications.mobilenet_v2.preprocess_input(img_array)
    predictions = model.predict(processed_img)
    predicted_class_index = np.argmax(predictions[0])
    confidence = float(np.max(predictions[0]))

    classes = [
        'Apple Scab', 'Healthy Apple', 'Corn Common Rust', 
        'Healthy Corn', 'Potato Early Blight', 'Healthy Potato', 'Random'
    ] 

    predicted_name = classes[predicted_class_index]

    if predicted_name == 'Random' or confidence < 0.50:
        return Response({
            "class_name": "Unknown Object",
            "confidence": 0,
            "solution": "Please upload a clear image of a supported plant leaf (Apple, Corn, or Potato)."
        })
    
    try:
        solution_obj = DiseaseSolution.objects.get(plant_disease_name__iexact=predicted_name)
        solution_text = solution_obj.plant_disease_solution
    except DiseaseSolution.DoesNotExist:
        solution_text = f"We identified {predicted_name}, but no specific treatment was found in our database. Please consult a local agronomist."
    
    if request.user.is_authenticated:
            PredictionHistory.objects.create(
                user=request.user,
                disease=solution_obj,
                confidence=round(confidence, 4)
            )

    return Response({
        "class_name": predicted_name,
        "confidence": round(confidence, 4),
        "solution": solution_text
    })

@api_view(['GET'])
def get_all_solutions(request):
    try:
        solutions = DiseaseSolution.objects.all()
        data = [{"name": s.plant_disease_name, "solution": s.plant_disease_solution} for s in solutions]
        return Response(data)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_history(request):
    history = PredictionHistory.objects.filter(user=request.user).order_by('-created_at')
    
    data = [{
        "id": h.id,
        "disease_name": h.disease.plant_disease_name,
        "confidence": h.confidence,
        "date": h.created_at.strftime("%Y-%m-%d %H:%M")
    } for h in history]
    
    return Response(data)