from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse
from .models import Project, ProjectType
from django.views.generic import ListView, DetailView
from .forms import ProjectForm
import json
from django.http import JsonResponse

def home_page(request):
    projects = Project.objects.all()
    project_types = ProjectType.objects.all()
    return render(request, 'carsonapp/index.html', {'projects': projects, 'project_types': project_types})

# class Project(ListView):
# 	model = Project
# 	template_name = 'carsonapp/games.html'

def upload_project(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            json_file = request.FILES.get('json_file')
            if json_file:
                try:
                    json_data = json.load(json_file)
                    print("Received JSON data:", json_data)
                    json_file.seek(0)
                except json.JSONDecodeError:
                    form.add_error('json_file', 'Invalid JSON format.')
                    return render(request, 'carsonapp/upload_project.html', {'form': form})

            form.save()
            return redirect('project_success')
    else:
        form = ProjectForm()
    return render(request, 'carsonapp/upload_project.html', {'form': form})

def upload_success(request):
    return render(request, 'carsonapp/project_success.html')

def project_page(request, id):
    print(id)
    project = get_object_or_404(Project, pk=id)

    project_content = None
    if project.json_file:
         with project.json_file.open('r') as f:
              project_content = json.load(f)
    print(project_content)

    return render(request, 'carsonapp/project_page.html', {'project': project, 'project_content': project_content})

def edit_project(request, pk):
    # Use pk to get the project
    project = get_object_or_404(Project, pk=pk)
    
    # Read the content of the JSON file if it exists
    json_content = ''
    if project.json_file:
        with open(project.json_file.path, 'r') as f:
            json_content = f.read()

    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES, instance=project)
        if form.is_valid():
            # If JSON content is edited, save it
            if 'json_file_content' in request.POST:
                json_content = request.POST['json_file_content']
                with open(project.json_file.path, 'w') as f:
                    f.write(json_content)
            
            # Save other fields (image, video, etc.)
            form.save()
            return redirect('web-home')
    
    else:
        form = ProjectForm(instance=project)
    
    return render(request, 'carsonapp/edit_project.html', {
        'form': form,
        'project': project,
        'json_content': json_content  # Pass the JSON content to the template
    })

def resume_page(request):
	return render(request, 'carsonapp/resume.html', {})

def about_page(request):
	return render(request, 'carsonapp/about.html', {})