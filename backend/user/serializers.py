from rest_framework import serializers

from user.admin import User


class UserprofileSerializer(serializers.ModelSerializer):
    review_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    def get_review_count(self, obj):
        return obj.user_reviews.count()

    def get_comment_count(self, obj):
        return obj.user_comments.count()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 'things_i_love', 'description',
                  'joined_date', 'profile_picture', 'banner_picture',
                  'location', 'review_count', 'comment_count']
        # location, number of reviews and number of comments


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
