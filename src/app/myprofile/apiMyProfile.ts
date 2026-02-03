import { apiAxios } from "@/lib/apiAxios"
import type { BlogResponse } from "@/types/blog"

export const getMyPosts = async ({ limit, page }: BlogResponse) => {
    const response = await apiAxios.get("/posts/my-posts", {
        params: {
            limit: limit,
            page: page
        }
    });
    return response.data;
}