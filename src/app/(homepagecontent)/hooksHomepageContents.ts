import { BlogResponse } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getHomePageContents } from "./apiHomepageContent";

export const useGetHomePageContents = (params: BlogResponse) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['blogPosts'],
        queryFn: () => getHomePageContents(params)
    })
}