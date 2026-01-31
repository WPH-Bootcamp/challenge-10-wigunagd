import { apiAxios } from "@/lib/apiAxios"
import type { BlogResponse } from "@/types/blog"

export const getHomePageContents = async ({ limit, page }: BlogResponse) => {
    const response = await apiAxios.get("/posts/recommended", {
        params: {
            limit: limit,
            page: page
        }
    });
    console.log(response, 'hooks');
    return response.data;
}