import json
from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from django.contrib import messages
from django import forms
from django.utils.text import slugify
from django.http import HttpResponseRedirect

# Importiere deine Models
from .models import CV, WorkExperience, Education, SkillCategory, SkillItem

# 1. Ein einfaches Formular für den Datei-Upload
class JsonImportForm(forms.Form):
    json_file = forms.FileField(label="CV JSON Datei auswählen")

@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    # Deine bisherigen Einstellungen...
    list_display = ('first_name', 'last_name', 'label', 'email')
    search_fields = ('first_name', 'last_name')
    
    # Custom Template, um den Button oben rechts anzuzeigen
    change_list_template = "admin/cv_change_list.html"

    def get_urls(self):
        urls = super().get_urls()
        my_urls = [
            path('import-json/', self.admin_site.admin_view(self.import_json), name='cv_import_json'),
        ]
        return my_urls + urls

    def import_json(self, request):
        if request.method == "POST":
            form = JsonImportForm(request.POST, request.FILES)
            if form.is_valid():
                json_file = request.FILES["json_file"]
                try:
                    # JSON laden
                    data = json.load(json_file)
                    self.process_import(data, request)
                    messages.success(request, "CV erfolgreich importiert!")
                    return redirect("..") # Zurück zur Liste
                except Exception as e:
                    messages.error(request, f"Fehler beim Import: {str(e)}")
        else:
            form = JsonImportForm()

        payload = {"form": form}
        return render(request, "admin/json_import_form.html", payload)

    def process_import(self, data, request):
        """
        Hier passiert die Magie: JSON -> Django Models
        """
        basics = data.get('basics', {})
        name = basics.get('name', {})
        
        first_name = name.get('first', 'Unbekannt')
        last_name = name.get('last', 'Unbekannt')
        slug = slugify(f"{first_name}-{last_name}")

        # 1. CV (Hauptobjekt) erstellen oder updaten
        cv, created = CV.objects.update_or_create(
            slug=slug,
            defaults={
                'first_name': first_name,
                'last_name': last_name,
                'label': basics.get('label', ''),
                'email': basics.get('email', ''),
                'website': basics.get('website', ''),
                'summary': basics.get('summary', ''),
                'address': basics.get('location', {}).get('address', ''),
                'postal_code': basics.get('location', {}).get('postalCode', ''),
                'city': basics.get('location', {}).get('city', ''),
                'country_code': basics.get('location', {}).get('countryCode', 'DE'),
                
                # Styles
                'primary_color': data.get('style', {}).get('colors', {}).get('primary', '#171D26'),
                'accent_color': data.get('style', {}).get('colors', {}).get('accent', '#FF5959'),
                
                # --- NEU: Experience Feld aus dem Root des JSON ---
                'experience': data.get('experience', ''),
            }
        )

        # 2. Alte Relationen löschen (Clean Start für diesen CV)
        WorkExperience.objects.filter(cv=cv).delete()
        Education.objects.filter(cv=cv).delete()
        SkillCategory.objects.filter(cv=cv).delete()

        # 3. Work Experience importieren
        for work in data.get('work', []):
            # TechStack Array ["React", "Node"] -> String "React, Node"
            tech_stack_raw = work.get('techStack', [])
            tech_stack_str = ", ".join(tech_stack_raw) if isinstance(tech_stack_raw, list) else str(tech_stack_raw)

            WorkExperience.objects.create(
                cv=cv,
                company=work.get('company', ''),
                location=work.get('location', ''),
                position=work.get('position', ''),
                start_date=work.get('startDate', ''),
                end_date=work.get('endDate', None),
                current=work.get('current', False),
                summary=work.get('summary', ''),
                company_size=work.get('companySize', ''),
                tech_stack=tech_stack_str
            )

        # 4. Education importieren
        for edu in data.get('education', []):
            Education.objects.create(
                cv=cv,
                institution=edu.get('institution', ''),
                area=edu.get('area', ''),
                study_type=edu.get('studyType', ''),
                summary=edu.get('summary', '')
            )

        # 5. Skills importieren
        for cat in data.get('skills', []):
            category_obj = SkillCategory.objects.create(
                cv=cv,
                name=cat.get('category', 'Sonstiges')
            )
            
            for item in cat.get('items', []):
                SkillItem.objects.create(
                    category=category_obj,
                    name=item.get('name', ''),
                    level=item.get('level', '') 
                )