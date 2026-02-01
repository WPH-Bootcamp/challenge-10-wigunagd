import { apiAxios } from "@/lib/apiAxios"
import type { BlogResponse } from "@/types/blog"

export const getRecommendations = async ({ limit, page }: BlogResponse) => {
    const response = await apiAxios.get("/posts/recommended", {
        params: {
            limit: limit,
            page: page
        }
    });
    return response.data;
}

export const getMostLiked = async ({ limit, page }: BlogResponse) => {
    const response = await apiAxios.get("/posts/most-liked", {
        params: {
            limit: limit,
            page: page
        }
    });
    return response.data;
}