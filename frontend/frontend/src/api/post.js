import api from "./axios";

// Get all posts
export const getPosts = () => {
    return api.get("/posts/");
};

// Create a new post
export const createPost = (formData) => {
    return api.post("/posts/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Update a post
export const updatePost = (id, formData) => {
    return api.put(`/posts/${id}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete a post
export const deletePost = (id) => {
    return api.delete(`/posts/${id}/`);
};