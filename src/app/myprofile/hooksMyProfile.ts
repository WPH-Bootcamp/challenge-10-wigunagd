import { BlogResponse } from "@/types/blog"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { getComments, getLikes, getMyPosts } from "./apiMyProfile"
import { PostCommentList, PostLikeList } from "@/types/commentlike"

export const useGetMyPosts = (params: BlogResponse) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['recommendations', params],
        queryFn: () => getMyPosts(params)
    })
}

export const useGetLikes = (id: number) => {
    return useQuery<PostLikeList, AxiosError>({
        queryKey: ['likeList', id],
        queryFn: () => getLikes(id),
        enabled: !!id && id > 0
    })
}

export const useGetComments = (id: number) => {
    return useQuery<PostCommentList, AxiosError>({
        queryKey: ['commentList', id],
        queryFn: () => getComments(id),
        enabled: !!id && id > 0
    })
}