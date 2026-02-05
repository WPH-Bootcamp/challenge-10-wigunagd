import { apiAxios } from "@/lib/apiAxios";

export const doSendPost = async (formdata: FormData) => {
    const response = await apiAxios.post(`/posts`, formdata);
    return response.data;
}