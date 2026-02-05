import { BlogResponse } from "@/types/blog"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { doDelete, doDeleteComment, doUpdatePassword, doUpdateProfile, getComments, getLikes, getMyPosts } from "./apiMyProfile"
import { PostCommentList, PostLikeList } from "@/types/commentlike"
import { GenericResponse } from "@/types/apiresponse"
import { ChangePasswordRequestBody } from "@/types/profile"

export const useGetMyPosts = (params: BlogResponse) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['MyPosts', params],
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
        queryKey: ['commentList'],
        queryFn: () => getComments(id),
        enabled: !!id && id > 0
    })
}

export const useDoDelete = () => {
    const queryClient = useQueryClient();
    return useMutation<GenericResponse, AxiosError, number>({
        mutationFn: (id: number) => doDelete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['MyPosts']});
        }
    })
}

export const useDoUpdatePassword = () => {
    return useMutation<GenericResponse, AxiosError, ChangePasswordRequestBody>({
        mutationFn: (body) => doUpdatePassword(body)
    })
}

export const useDoUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation<GenericResponse, AxiosError, FormData>({
        mutationFn: (body) => doUpdateProfile(body),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['me']});
        }
    })
}

export const useDoDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation<GenericResponse, AxiosError, number>({
        mutationFn: (id: number) => doDeleteComment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['commentList']});
        }
    })
}