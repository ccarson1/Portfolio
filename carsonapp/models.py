from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils import timezone

class ProjectType(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Project(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=50)
    video = models.FileField(
        upload_to='projects/videos/',
        validators=[FileExtensionValidator(allowed_extensions=['mp4', 'avi', 'mov', 'mkv'])],
        null=True,
        blank=True
    )
    category = models.ForeignKey(ProjectType, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to='projects/images/', null=True, blank=True)
    date = models.DateField(default=timezone.now)
    language = models.CharField(max_length=50, null=True, blank=True)
    github = models.CharField(max_length=150, null=True, blank=True)
    json_file = models.FileField(
        upload_to='projects/json/',
        validators=[FileExtensionValidator(allowed_extensions=['json'])],
        null=True,
        blank=True
    )

    def __str__(self):
        return self.title
    


