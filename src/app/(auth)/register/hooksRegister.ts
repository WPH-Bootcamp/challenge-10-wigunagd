import { UserRegisterBody, UserRegisterResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { doRegister } from "./apiRegister";

export const useDoRegister = () => {
    return useMutation<UserRegisterResponse, AxiosError, UserRegisterBody>({
        mutationFn: (body) => doRegister(body)
    })
}