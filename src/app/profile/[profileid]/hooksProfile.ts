import { UserProfile } from "@/types/profile"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { getProfile, getProfilePosts } from "./apiProfile"
import { BlogResponse } from "@/types/blog"

export const useGetProfile = (id: number) => {
    return useQuery<UserProfile, AxiosError>({
        queryKey: ['profile'],
        queryFn: () => getProfile(id),
        enabled: !!id && id > 0
    })
}

export const useGetProfilePosts = (params: BlogResponse) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['ProfilePosts', params],
        queryFn: () => getProfilePosts(params),
        enabled: (params.byUserName?.length ?? 0) > 0
    })
}