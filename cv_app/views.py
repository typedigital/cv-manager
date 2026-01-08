from rest_framework import viewsets
from .models import CV
from .serializers import CVSerializer

class CVViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows CVs to be viewed or edited.
    """
    queryset = CV.objects.all()
    serializer_class = CVSerializer