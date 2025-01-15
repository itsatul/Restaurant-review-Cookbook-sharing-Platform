from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['email']

    # validate if user sent an email
    def validate(self, data):
        if data['email']:
            return data
        raise serializers.ValidationError({'email': 'email is missing'})

    # create new user
    def save(self, **kwargs):
        email = self.validated_data['email']
        new_user = User.objects.create(email=email, username=email, is_active=False)
        new_user.save()
        return new_user


class ProfileValidationSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
