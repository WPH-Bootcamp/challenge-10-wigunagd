import { apiAxios } from "@/lib/apiAxios";

export const getProfile = async (id: number) => {
    const response = await apiAxios.get(`/users/${id}`);
    return response.data;
}