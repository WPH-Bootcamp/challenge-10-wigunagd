import { BlogResponse } from "@/types/blog";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getRecommendations, getMostLiked } from "./apiHomepageContent";

export const useGetRecommendations = (params: BlogResponse) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['recommendations', params],
        queryFn: () => getRecommendations(params),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData
    })
}

export const useGetMostLiked = (params: BlogResponse) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['recommendations', params],
        queryFn: () => getMostLiked(params),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5
    })
}