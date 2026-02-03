import { apiAxios } from '@/lib/apiAxios';
import { UserLoginBody } from '@/types/auth';

export const doLogin = async ({ email, password }: UserLoginBody) => {
    const response = await apiAxios.post("/auth/login", {
        email: email,
        password: password
    });

    return response.data;
}