import { apiAxios } from '@/lib/apiAxios';
import { UserRegisterBody } from '@/types/auth';

export const doRegister = async ({ name, username, email, password }: UserRegisterBody) => {
    const response = await apiAxios.post("/auth/register", {
        name: name,
        username: username,
        email: email,
        password: password
    });

    return response.data;
}