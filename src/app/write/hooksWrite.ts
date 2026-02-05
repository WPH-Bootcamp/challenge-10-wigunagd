import { BlogPost } from "@/types/blog";
import { AxiosError } from "axios";
import { doSendPost } from "./apiWrite";
import { useMutation } from "@tanstack/react-query";

export const useDoSendPost = () => {
    return useMutation<BlogPost, AxiosError, FormData>({
        mutationFn: (body) => doSendPost(body)
    })
}