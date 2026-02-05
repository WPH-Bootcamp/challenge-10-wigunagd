import { apiAxios } from "@/lib/apiAxios";
import { EditPostParamType } from "./typeEditPost";

export const doEditPost = async ({ id, formdata }: EditPostParamType) => {
    const response = await apiAxios.patch(`/posts/${id}`, formdata);
    return response.data;
}