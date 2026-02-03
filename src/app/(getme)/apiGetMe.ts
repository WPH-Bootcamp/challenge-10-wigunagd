import { apiAxios } from "@/lib/apiAxios";

export const getMe = async () => {
    const response = await apiAxios.get("/users/me");
    return response.data;
}