import { apiAxios } from "@/lib/apiAxios"
import type { BlogResponse } from "@/types/blog"

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