import { BlogResponse } from "@/types/blog"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { getMyPosts } from "./apiMyProfile"

export const useGetMyPosts = (params: BlogResponse) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['recommendations', params],
        queryFn: () => getMyPosts(params)
    })
}