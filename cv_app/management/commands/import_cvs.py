import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils.text import slugify
from cv_app.models import CV, WorkExperience, Education, SkillCategory, SkillItem

class Command(BaseCommand):
    help = 'Imports CVs from JSON-Data in frontend/public/data folder'

    def handle(self, *args, **kwargs):
        # Path to Data folter (relative to backend folder)
        # We assert that: root/backend/manage.py -> root/frontend/public/data
        base_dir = settings.BASE_DIR
        data_dir = os.path.join(base_dir, 'frontend', 'public', 'data')
        
        if not os.path.exists(data_dir):
            self.stdout.write(self.style.ERROR(f"Ordner nicht gefunden: {data_dir}"))
            return

        json_files = [f for f in os.listdir(data_dir) if f.endswith('.json') and f != 'cv_list.json']

        self.stdout.write(f"Gefundene Dateien: {json_files}")

        for filename in json_files:
            file_path = os.path.join(data_dir, filename)
            self.import_file(file_path)

    def import_file(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        basics = data.get('basics', {})
        name = basics.get('name', {})
        
        # 1. CV Base Data creation/update
        first_name = name.get('first', 'Unbekannt')
        last_name = name.get('last', 'Unbekannt')
        slug = slugify(f"{first_name}-{last_name}")

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
                'primary_color': data.get('style', {}).get('colors', {}).get('primary', '#171D26'),
                'accent_color': data.get('style', {}).get('colors', {}).get('accent', '#FF5959'),
            }
        )

        action = "Erstellt" if created else "Aktualisiert"
        self.stdout.write(self.style.SUCCESS(f"{action}: {first_name} {last_name}"))

        # 2. Clean uo Relations (Deletion and Creation for clean Import)
        WorkExperience.objects.filter(cv=cv).delete()
        Education.objects.filter(cv=cv).delete()
        SkillCategory.objects.filter(cv=cv).delete()

        # 3. Work Experience import
        for work in data.get('work', []):
            # TechStack Array to String konversion
            tech_stack_list = work.get('techStack', [])
            tech_stack_str = ", ".join(tech_stack_list) if isinstance(tech_stack_list, list) else str(tech_stack_list)

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

        # 4. Education import
        for edu in data.get('education', []):
            Education.objects.create(
                cv=cv,
                institution=edu.get('institution', ''),
                area=edu.get('area', ''),
                study_type=edu.get('studyType', ''),
                summary=edu.get('summary', '')
            )

        # 5. Skills import
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