import { useNavigation } from "@react-navigation/native";
import axios, { Axios, AxiosRequestConfig } from "axios";
import storage from "storage";
import { Views } from "types/navigation";

export interface IResponse<T = any>
  extends Promise<{
    errno: number;
    data: T;
    errmsg: string;
  }> {}

interface MyAxiosInstance extends Axios {
  // eslint-disable-next-line
  (config: AxiosRequestConfig): IResponse;
  // eslint-disable-next-line
  (url: string, config?: AxiosRequestConfig): IResponse;
}

class MyAxios {
  // axios 实例
  instance: MyAxiosInstance;

  constructor(config: AxiosRequestConfig) {
    // @ts-ignore
    this.instance = axios.create(config);

    // 请求拦截器
    this.instance.interceptors.request.use(
      async (cfg) => {
        // 读取
        try {
          if (cfg.url === "/auth/login") return cfg;
          const ret = await storage.load({
            key: "Token",
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: false, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            syncInBackground: false,
          });
          if (!cfg.headers["X-Litemall-Token"]) {
            cfg.headers["X-Litemall-Token"] = `${ret.token || ""}`;
          }
          return cfg;
        } catch (err: any) {
          //如果没有找到数据且没有sync方法，
          //或者有其他异常，则在catch中返回
          switch (err.name) {
            case "NotFoundError":
              // TODO;
              console.warn("NotFoundError", err.message);
              break;
            case "ExpiredError":
              // TODO
              console.warn("ExpiredError", err.message);
              break;
          }
          return cfg;
        }
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // const navigation = useNavigation();
        if (response.status === 200) {
          if (response.data.errno === 501) {
            // 清除登录相关内容
            try {
              storage.remove({ key: "userInfo" });
              storage.remove({ key: "Token" });
            } catch (e) {
              // Do something when catch error
            }
            // todo 切换到登录页面
            console.error("need login");
            // navigation.navigate(Views.LogIn);
          } else {
            return response.data;
          }
        }

        return response.data;
      },
      (error) => {
        console.error("响应拦截到错误", error);
      }
    );
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined
  ): IResponse<T> {
    return this.instance.get(url, config);
  }

  post<T = any>(
    url: string,
    data?: {} | undefined,
    config?: AxiosRequestConfig
  ): IResponse<T> {
    return this.instance.post(url, data, config);
  }
}

export const request = new MyAxios({
  baseURL: "http://10.251.10.74:8080/wx",
  timeout: 1000 * 5,
});
