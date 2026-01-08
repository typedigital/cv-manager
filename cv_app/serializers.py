from rest_framework import serializers
from .models import CV, WorkExperience, Education, SkillCategory, SkillItem

# 1. WorkSerializer
class WorkSerializer(serializers.ModelSerializer):
    techStack = serializers.SerializerMethodField()
    
    startDate = serializers.CharField(source='start_date')
    endDate = serializers.CharField(source='end_date', required=False, allow_null=True)
    companySize = serializers.CharField(source='company_size', required=False, allow_blank=True)

    class Meta:
        model = WorkExperience
        fields = ['company', 'location', 'position', 'startDate', 'endDate', 'current', 'summary', 'techStack', 'companySize']

    def get_techStack(self, obj):
        return [t.strip() for t in obj.tech_stack.split(',')] if obj.tech_stack else []

# 2. EducationSerializer
class EducationSerializer(serializers.ModelSerializer):
    studyType = serializers.CharField(source='study_type')

    class Meta:
        model = Education
        fields = ['institution', 'area', 'studyType', 'summary']

# 3. Skill Serializers
class SkillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillItem
        fields = ['name', 'level']

class SkillCategorySerializer(serializers.ModelSerializer):
    items = SkillItemSerializer(many=True, read_only=True)
    category = serializers.CharField(source='name')

    class Meta:
        model = SkillCategory
        fields = ['category', 'items']

# 4. CVSerializer
class CVSerializer(serializers.ModelSerializer):
    basics = serializers.SerializerMethodField()
    work = WorkSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    skills = SkillCategorySerializer(source='skill_categories', many=True, read_only=True)
    style = serializers.SerializerMethodField()

    class Meta:
        model = CV
        fields = ['basics', 'work', 'education', 'skills', 'style']

    def get_basics(self, obj):
        request = self.context.get('request')
        image_url = ""
        if obj.image:
            try:
                # Baut: http://127.0.0.1:8000/media/profiles/bild.jpg
                image_url = request.build_absolute_uri(obj.image.url)
            except:
                # Fallback, falls request context fehlt (z.B. in Tests)
                image_url = obj.image.url

        return {
            "name": { "first": obj.first_name, "last": obj.last_name },
            "label": obj.label,
            "image": image_url,
            "email": obj.email,
            "website": obj.website,
            "location": {
                "address": obj.address,
                "postalCode": obj.postal_code,
                "city": obj.city,
                "countryCode": obj.country_code
            },
            "summary": obj.summary
        }

    def get_style(self, obj):
        return {
            "colors": {
                "primary": obj.primary_color,
                "accent": obj.accent_color,
                "background": "#FFFFFF",
                "secondaryBackground": "#E3E5E5"
            }
        }
