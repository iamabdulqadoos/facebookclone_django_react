import api from "./axios";

export const loginUser = async (data) => {
    const response = await api.post(
        "/accounts/login/",
        data
    );

    return response.data;
};

export const registerUser = async (data) => {
    const response = await api.post(
        "/accounts/register/",
        data
    );

    return response.data;
};

export const verifyOTP = async (data) => {
    const response = await api.post(
        "/accounts/verify-otp/",
        data
    );

    return response.data;
};
export const verifyResetOTP = async (data) => {
    const response = await api.post(
        "/accounts/verify-reset-otp/",
        data
    );

    return response.data;
};
export const resetPassword = async (data) => {
    const response = await api.post(
        "/accounts/reset-password/",
        data
    );

    return response.data;
};