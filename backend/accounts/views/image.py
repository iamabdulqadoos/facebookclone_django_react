from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from accounts.serializers.image import (
    ProfilePictureSerializer,
    CoverPhotoSerializer,
)


class ProfilePictureView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = ProfilePictureSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Profile Picture Updated Successfully",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CoverPhotoView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = CoverPhotoSerializer(
            request.user,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                {
                    "message": "Cover Photo Updated Successfully",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)