from django.db import models

class CV(models.Model):
    # Meta / Internal
    slug = models.SlugField(unique=True, help_text="z.B. lucas-falkowsky")
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Basics
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    label = models.CharField(max_length=200, help_text="z.B. Fullstack Developer")
    image = models.ImageField(upload_to='profiles/', blank=True, null=True)
    email = models.EmailField()
    website = models.URLField(blank=True)
    summary = models.TextField()
    
    # Location
    address = models.CharField(max_length=200, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    city = models.CharField(max_length=100, blank=True)
    country_code = models.CharField(max_length=10, default="DE")

    # Styling (Optional: JSONField für flexible Farben)
    primary_color = models.CharField(max_length=7, default="#171D26")
    accent_color = models.CharField(max_length=7, default="#FF5959")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class WorkExperience(models.Model):
    cv = models.ForeignKey(CV, related_name='work', on_delete=models.CASCADE)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    position = models.CharField(max_length=200)
    start_date = models.CharField(max_length=20, help_text="z.B. 2023-01")
    end_date = models.CharField(max_length=20, blank=True, null=True)
    current = models.BooleanField(default=False)
    summary = models.TextField()
    company_size = models.CharField(max_length=50, blank=True)
    
    # Tech Stack als einfacher Text (kommagetrennt) oder ManyToMany
    tech_stack = models.CharField(max_length=500, blank=True, help_text="Kommagetrennt")

    class Meta:
        ordering = ['-start_date']

class Education(models.Model):
    cv = models.ForeignKey(CV, related_name='education', on_delete=models.CASCADE)
    institution = models.CharField(max_length=200)
    area = models.CharField(max_length=200)
    study_type = models.CharField(max_length=100)
    summary = models.TextField(blank=True)

class SkillCategory(models.Model):
    cv = models.ForeignKey(CV, related_name='skill_categories', on_delete=models.CASCADE)
    name = models.CharField(max_length=100, help_text="Development, Sprachen, etc.")

class SkillItem(models.Model):
    category = models.ForeignKey(SkillCategory, related_name='items', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    level = models.CharField(max_length=50, blank=True, help_text="z.B. 80% oder leer lassen für Tags")