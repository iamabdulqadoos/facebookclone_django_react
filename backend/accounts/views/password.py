from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from accounts.serializers import ChangePasswordSerializer


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(
            data=request.data
        )

        if serializer.is_valid():

            if not request.user.check_password(
                serializer.validated_data["old_password"]
            ):
                return Response(
                    {
                        "error": "Old password is incorrect."
                    },
                    status=400,
                )

            request.user.set_password(
                serializer.validated_data["new_password"]
            )

            request.user.save()

            return Response(
                {
                    "message": "Password Changed Successfully"
                }
            )

        return Response(
            serializer.errors,
            status=400,
        )