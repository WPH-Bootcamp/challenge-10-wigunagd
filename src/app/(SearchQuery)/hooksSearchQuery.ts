import { BlogResponse } from "@/types/blog";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getSearch } from "./apiSearchQuery";

export const useGetSearch = (params: BlogResponse, option?: Partial<UseQueryOptions<BlogResponse, AxiosError>>) => {
    return useQuery<BlogResponse, AxiosError>({
        queryKey: ['search', params],
        queryFn: () => getSearch(params),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        ...option
    });
}