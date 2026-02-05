import { BlogPost } from "@/types/blog";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { doEditPost } from "./apiEditPost";
import { EditPostParamType } from "./typeEditPost";

export const useDoEditPost = () => {
    return useMutation<BlogPost, AxiosError, EditPostParamType>({
        mutationFn: ({ id, formdata }) => doEditPost({ id, formdata })
    })
}