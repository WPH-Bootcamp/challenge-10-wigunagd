import { useAppDispatch } from "@/redux/3_redux"
import { UserLoginBody, UserLoginResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { doLogin } from "./apiLogin";
import { setLoginData } from "@/redux/1_authSlice";

export const useDoLogin = () => {
    const dispatch = useAppDispatch();
    return useMutation<UserLoginResponse, AxiosError, UserLoginBody>({
        mutationFn: (body) => doLogin(body),
        onSuccess: (data) => {
            dispatch(setLoginData(data.token))
        }
    })
}