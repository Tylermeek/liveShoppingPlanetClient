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

// 注册
export const signUp = ({
  mobile,
  code,
  username,
  password,
}: {
  mobile: string;
  code: string;
  username: string;
  password: string;
}) => {
  return request.post<IAuthRes>("/auth/register", {
    username,
    password,
    mobile,
    code,
  });
};

// 获取用户信息
export const getUserInfo = () => request.get<IUserInfo>("/auth/info");

// 更新用户资料
export const updateUserProfile = ({ avatar, gender, nickname }: IUserInfo) => {
  return request.post("/auth/profile", { avatar, gender, nickname });
};

// 注册验证码
export const authRegisterCaptcha = ({ mobile }: { mobile: string }) => {
  return request.post("/auth/regCaptcha", { mobile });
};

// 注册验证码
export const authCaptcha = ({ mobile }: { mobile: string }) => {
  return request.post("/auth/captcha", { mobile });
};
