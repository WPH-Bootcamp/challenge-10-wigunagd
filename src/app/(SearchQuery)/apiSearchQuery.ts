import { apiAxios } from "@/lib/apiAxios";
import { BlogResponse } from "@/types/blog";

export const getSearch =async ({limit, page, query} : BlogResponse) => {
    const response = await apiAxios.get('/posts/search', {
        params: {
            limit: limit,
            page: page,
            query: query
        }
    });

    return response.data;
}