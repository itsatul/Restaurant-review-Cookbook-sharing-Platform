# Register your models here.
from django.contrib import admin

from review_comment.models import ReviewComment


class ReviewCommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'comment']
    search_fields = ['comment']


admin.site.register(ReviewComment, ReviewCommentAdmin)
