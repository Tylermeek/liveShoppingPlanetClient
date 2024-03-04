import { request } from "axios/config";

interface User {
    userInfo: {
        nickName: string,
        avatarUrl: string
    },
    token: string
}

export const login = ({ username, password }: { username: string, password: string }) => {
    return request.post<User>("/auth/login", { username, password });
};

export const signUp = ({ mobile, code, username, password }: { mobile: string, code: string, username: string, password: string }) => {
    return request.post<User>("/auth/register", { username, password, mobile, code });
};

export const authRegisterCaptcha = ({ mobile }: { mobile: string }) => {
    return request.post('/auth/regCaptcha', { mobile })
}