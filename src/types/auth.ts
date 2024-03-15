export interface IUserInfo {
  nickName: string;
  avatarUrl?: string;
  gender?: string;
  mobile?: string;
}

export interface IAuthRes {
  userInfo: IUserInfo;
  token: string;
}

export interface IRegInfo{
  mobile: string;
  code: string;
  username: string;
  password: string;
}
