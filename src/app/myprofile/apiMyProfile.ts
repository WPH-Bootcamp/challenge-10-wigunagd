import { apiAxios } from "@/lib/apiAxios"
import type { BlogResponse } from "@/types/blog"
import { ChangePasswordRequestBody, UpdateProfileRequestBody } from "@/types/profile";

export const getMyPosts = async ({ limit, page }: BlogResponse) => {
    const response = await apiAxios.get("/posts/my-posts", {
        params: {
            limit: limit,
            page: page
        }
    });
    return response.data;
}

export const getLikes = async (id: number) => {
    const response = await apiAxios.get(`/posts/${id}/likes`);
    return response.data;
}

export const getComments = async (id: number) => {
    const response = await apiAxios.get(`/posts/${id}/comments`);
    return response.data;
}

export const doDelete = async (id: number) => {
    const response = await apiAxios.delete(`/posts/${id}`);
    return response.data;
}

export const doUpdatePassword = async ({currentPassword, newPassword, confirmPassword} : ChangePasswordRequestBody) => {
    const response = await apiAxios.patch(`/users/password`, {
        currentPassword: currentPassword, 
        newPassword: newPassword, 
        confirmPassword: confirmPassword
    });
    return response.data;
}

export const doUpdateProfile = async (formdata: FormData) => {
    const response = await apiAxios.patch(`/users/profile`, formdata);
    return response.data;
}

export const doDeleteComment = async (commentId: number) => {
    const response = await apiAxios.delete(`/comments/${commentId}`);
    return response.data;
}