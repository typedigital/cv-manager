from django.contrib import admin
from .models import CV, WorkExperience, Education, SkillCategory, SkillItem

class WorkInline(admin.StackedInline):
    model = WorkExperience
    extra = 0

class EducationInline(admin.StackedInline):
    model = Education
    extra = 0

class SkillItemInline(admin.TabularInline):
    model = SkillItem
    extra = 1

class SkillCategoryInline(admin.StackedInline):
    model = SkillCategory
    extra = 0
    show_change_link = True

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'get_cv_name', 'get_skills_preview', 'get_item_count')
    list_filter = ('cv__last_name', 'name') 
    search_fields = ('name', 'items__name', 'cv__first_name', 'cv__last_name')
    inlines = [SkillItemInline]

    # --- Helper Functions ---

    def get_cv_name(self, obj):
        return f"{obj.cv.first_name} {obj.cv.last_name}"
    get_cv_name.short_description = "Gehört zu CV"
    get_cv_name.admin_order_field = 'cv__last_name'

    def get_skills_preview(self, obj):
        skills = obj.items.all()
        names = [s.name for s in skills]
        return ", ".join(names)
    get_skills_preview.short_description = "Enthaltene Skills"

    def get_item_count(self, obj):
        return obj.items.count()
    get_item_count.short_description = "Anzahl"

@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    inlines = [WorkInline, EducationInline, SkillCategoryInline]
    list_display = ('first_name', 'last_name', 'label')