import { UserProfile } from "@/types/profile"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { getProfile } from "./apiProfile"

export const useGetProfile = (id: number) => {
    return useQuery<UserProfile, AxiosError>({
        queryKey: ['profile'],
        queryFn: () => getProfile(id),
        enabled: !!id && id > 0
    })
}