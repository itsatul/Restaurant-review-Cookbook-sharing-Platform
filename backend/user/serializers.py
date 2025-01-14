from rest_framework import serializers

from user.admin import User


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'email', 'first_name', 'last_name'
#                   ]


class UserprofileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'things_i_love', 'description',
                  'joined_date']


# class LoginSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     password = serializers.CharField()
#
#     def validate(self, data):
#         email = data.get('email')
#         password = data.get('password')
#
#
# class RegisterSerializer(serializers.Serializer):
#     email = serializers.EmailField()
#     first_name = serializers.CharField()
#     last_name = serializers.CharField()
#     password = serializers.CharField()
#
#     def validate(self, data):
#         email = data.get('email')
#         first_name = data.get('first_name')
#         last_name = data.get('last_name')
#         password = data.get('password')


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()

    def validate(self, data):
        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if new_password != old_password:
            raise serializers.ValidationError('The new password does not match the old one.')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']
