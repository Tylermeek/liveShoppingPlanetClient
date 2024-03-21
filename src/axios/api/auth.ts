import { request } from "axios/config";
import { IAuthRes, IUserInfo } from "types/auth";

// 登录
export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return request.post<IAuthRes>("/auth/login", { username, password });
};

export const logout = () => request.post("/auth/logout");

// 注册
export const signUp = (data: {
  mobile: string;
  code: string;
  username: string;
  password: string;
}) => {
  return request.post<IAuthRes>("/auth/register", data);
};

export const resetPass = (data: {
  mobile: string;
  code: string;
  password: string;
}) => request.post("/auth/reset", data);

// 获取用户信息
export const getUserInfo = () => request.get<IUserInfo>("/auth/info");

// 更新用户资料
export const updateUserProfile = ({ avatar, gender, nickname }: any) => {
  return request.post("/auth/profile", { avatar, gender, nickname });
};

// 注册验证码
export const authRegisterCaptcha = ({ mobile }: { mobile: string }) => {
  return request.post("/auth/regCaptcha", { mobile });
};

// 图片验证码
export const authCaptcha = () => {
  return request.get<{ image: string }>("/auth/imageCode");
};
