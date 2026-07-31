from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from accounts.serializers import VerifyResetOTPSerializer


class VerifyResetOTPView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = VerifyResetOTPSerializer(
            data=request.data
        )

        if serializer.is_valid():

            otp = serializer.validated_data["otp"]

            otp.is_used = True
            otp.save()

            return Response(
                {
                    "message": "OTP verified successfully."
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )