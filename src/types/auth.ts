export interface UserRegisterBody {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface UserRegisterResponse {
    id: number;
    username: string;
    email: string;
}

export interface UserLoginBody {
    email: string;
    password: string;
}
export interface UserLoginResponse {
    token: string;
}

export interface UserMe {
    id: number;
    name: string;
    email: string;
    headline: string;
    avatarUrl: string;
}