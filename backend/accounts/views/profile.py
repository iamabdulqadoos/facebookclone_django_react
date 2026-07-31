from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from accounts.serializers.profile import ProfileSerializer



class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]


    def get(self, request):

        serializer = ProfileSerializer(
            request.user
        )

        return Response(
            serializer.data
        )


    def put(self, request):

        serializer = ProfileSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )



class UploadProfilePictureView(APIView):

    permission_classes = [IsAuthenticated]
    parser_classes = [
        MultiPartParser,
        FormParser
    ]


    def put(self, request):

        user = request.user

        user.profile_picture = request.FILES.get(
            "profile_picture"
        )

        user.save()


        return Response({
            "message": "Profile picture updated"
        })



class UploadCoverPhotoView(APIView):

    permission_classes = [IsAuthenticated]
    parser_classes = [
        MultiPartParser,
        FormParser
    ]


    def put(self, request):

        user = request.user

        user.cover_photo = request.FILES.get(
            "cover_photo"
        )

        user.save()


        return Response({
            "message": "Cover photo updated"
        })