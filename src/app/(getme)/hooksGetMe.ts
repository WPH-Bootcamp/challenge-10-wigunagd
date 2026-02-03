import { MeProfileType } from "@/redux/0_authType"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { getMe } from "./apiGetMe"

export const useGetMe = (options: Partial<UseQueryOptions<MeProfileType, AxiosError>> = {}) => {
    return useQuery<MeProfileType, AxiosError>({
        queryKey: ['me'],
        queryFn: () => getMe(),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        ...options
    })
}