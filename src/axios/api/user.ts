import { request } from "axios/config";

export const getUserInfo = (userId: string) => request.get("/wx/user", { data: { userId } })