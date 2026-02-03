import { BlogPost, CommentListResponse, CommentSendBody, CommentSendResponse, UserProfileResponse } from "@/types/blog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios";
import { doComment, getPostAuthorDetail, getPostDetail, getPostDetailComment } from "./apiDetail";

export const useGetPostDetail = (params: BlogPost) => {
    return useQuery<BlogPost, AxiosError>({
        queryKey: ['detail'],
        queryFn: () => getPostDetail(params)
    });
}

export const useGetPostAuthorDetail = (id: number) => {
    return useQuery<UserProfileResponse, AxiosError>({
        queryKey: ['authordetail', id],
        queryFn: () => getPostAuthorDetail(id)
    });
}

export const useGetPostDetailComment = (id: number) => {
    return useQuery<CommentListResponse, AxiosError>({
        queryKey: ['post-comments'],
        queryFn: () => getPostDetailComment(id),
        enabled: !!id,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 10
    });
};

export const useDoComment = () => {
    const queryClient = useQueryClient();
    return useMutation<CommentSendResponse, AxiosError, CommentSendBody>({
        mutationFn: (body) => doComment(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post-comments'] });
        }
    })
}