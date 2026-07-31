import api from "../api/axios";

// Get Logged-in User Profile
export const getProfile = async () => {

    const response = await api.get("/accounts/profile/");

    return response.data;

};

// Update Profile
export const updateProfile = async (data) => {

    const response = await api.put(
        "/accounts/profile/",
        data
    );

    return response.data;

};

// Upload Profile Picture
export const uploadProfilePicture = async (formData) => {

    const response = await api.put(
        "/accounts/profile-picture/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};

// Upload Cover Photo
export const uploadCoverPhoto = async (formData) => {

    const response = await api.put(
        "/accounts/cover-photo/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};