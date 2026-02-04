import { apiAxios } from "@/lib/apiAxios";
import { BlogResponse } from "@/types/blog";

export const getProfile = async (id: number) => {
    const response = await apiAxios.get(`/users/${id}`);
    return response.data;
}

export const getProfilePosts = async ({ byUserName, limit, page }: BlogResponse) => {
    const response = await apiAxios.get(`/posts/by-username/${byUserName}`, {
        params: {
            limit: limit,
            page: page
        }
    });
    return response.data;
}