import { BlogPost, CommentListResponse } from "@/types/blog";
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { getPostDetail, getPostDetailComment } from "./apiDetail";

export const useGetPostDetail = (params: BlogPost) => {
    return useQuery<BlogPost, AxiosError>({
        queryKey: ['detail'],
        queryFn: () => getPostDetail(params)
    });
}

export const useGetPostDetailComment = (id: string | number) => {
    return useQuery<CommentListResponse, AxiosError>({
        queryKey: ['post-comments', id],
        queryFn: () => getPostDetailComment(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    });
};