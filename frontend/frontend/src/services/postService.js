import api from "../api/axios";

// ==========================
// Get All Posts
// ==========================

export const getPosts = async () => {
    const response = await api.get("/posts/");
    return response.data;
};

// ==========================
// Create Post
// ==========================

export const createPost = async (formData) => {
    const response = await api.post(
        "/posts/",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

// ==========================
// Like Post
// ==========================

export const likePost = async (postId) => {
    const response = await api.post(
        `/posts/${postId}/like/`
    );

    return response.data;
};

// ==========================
// Unlike Post
// ==========================

export const unlikePost = async (postId) => {
    const response = await api.post(
        `/posts/${postId}/unlike/`
    );

    return response.data;
};

// ==========================
// Delete Post
// ==========================

export const deletePost = async (postId) => {
    const response = await api.delete(
        `/posts/${postId}/`
    );

    return response.data;
};
// ============================
// Get Comments
// ============================

export const getComments = async (postId) => {

    const response = await api.get(
        `/posts/${postId}/comments/`
    );

    return response.data;

};

// ============================
// Create Comment
// ============================

export const createComment = async (
    postId,
    comment
) => {

    const response = await api.post(
        `/posts/${postId}/comments/`,
        {
            comment,
        }
    );

    return response.data;

};

// ============================
// Delete Comment
// ============================

export const deleteComment = async (
    commentId
) => {

    const response = await api.delete(
        `/posts/comments/${commentId}/`
    );

    return response.data;

};
// =========================
// Share Post
// =========================

export const sharePost = async (postId, caption = "") => {

    const response = await api.post(
        `/posts/share/${postId}/`,
        {
            caption,
        }
    );

    return response.data;

};


// =========================
// Get Shared Posts
// =========================

export const getSharedPosts = async () => {

    const response = await api.get(
        "/posts/shared/"
    );

    return response.data;

};


// =========================
// Delete Shared Post
// =========================

export const deleteSharedPost = async (sharedPostId) => {

    const response = await api.delete(
        `/posts/shared/delete/${sharedPostId}/`
    );

    return response.data;

};
// =========================
// Unshare Post
// =========================

export const unsharePost = async (postId) => {

    const response = await api.delete(
        `/posts/share/${postId}/`
    );

    return response.data;

};
export const getPostById = async (postId) => {
    const response = await api.get(`/posts/${postId}/`);
    return response.data;
};