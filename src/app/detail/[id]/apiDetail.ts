import { apiAxios } from "@/lib/apiAxios";
import { BlogPost, CommentListResponse, CommentSendBody } from "@/types/blog";

export const getPostDetail = async ({id}: BlogPost) => {
    const response = await apiAxios.get(`/posts/${id}`);
    return response.data;
}

export const getPostDetailComment = async (id: string | number): Promise<CommentListResponse> => {
    const response = await apiAxios.get(`/posts/${id}/comments`);
    return response.data;
}

export const doComment = async ({ postId, content }: CommentSendBody) => {
    const response = await apiAxios.post(`/comments/${postId}`, {
        content: content
    });

    return response.data;
}