from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

User = get_user_model()


class CustomUserAdmin(UserAdmin):
    readonly_fields = ('joined_date',)

    # Fields shown when creating a new instance
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2')}
         ),
    )

    # Fields when reading/updating an instance
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Personal info', {
            'fields': (
                'first_name',
                'last_name',
                'phone',
                'location',
                'things_i_love',
                'description',
                'profile_picture',
                'banner_picture'
            )
        }),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'joined_date')}),
        ('Groups', {'fields': ('groups',)}),
    )

    # Fields displayed when looking at a list of instances
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
