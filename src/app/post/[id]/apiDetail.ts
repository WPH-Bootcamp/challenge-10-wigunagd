import { apiAxios } from "@/lib/apiAxios";
import { BlogPost, CommentListResponse } from "@/types/blog";

export const getPostDetail = async ({id}: BlogPost) => {
    const response = await apiAxios.get(`/posts/${id}`);
    return response.data;
}

export const getPostDetailComment = async (id: string | number): Promise<CommentListResponse> => {
    const response = await apiAxios.get(`/posts/${id}/comments`);
    return response.data;
}