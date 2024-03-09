import axios, { Axios, AxiosRequestConfig } from 'axios';
import storage from 'storage';

export interface IResponse<T = any>
  extends Promise<{
    code: number;
    data: T;
    message: string;
  }> { }

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
      (cfg) => {
        // 读取
        // try {
        //   const ret = await storage
        //     .load({
        //       key: 'usreInfo',
        //       // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
        //       autoSync: true, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
        //       // syncInBackground(默认为true)意味着如果数据过期，
        //       // 在调用sync方法的同时先返回已经过期的数据。
        //       syncInBackground: true,
        //     })
        //   if (!cfg.headers['X-Litemall-Token']) {
        //     cfg.headers['X-Litemall-Token'] = `${ret.token || ''}`;
        //   }
        //   return cfg
        // } catch (err: any) {
        //   //如果没有找到数据且没有sync方法，
        //   //或者有其他异常，则在catch中返回
        //   if (cfg.url === "/wx/auth/login") return cfg;

        //   console.warn(err.message);
        //   switch (err.name) {
        //     case 'NotFoundError':
        //       // TODO;
        //       break;
        //     case 'ExpiredError':
        //       // TODO
        //       break;
        //   }
        //   return cfg;
        // }
        return cfg
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        // console.log('response.config.url', response.config.url);
        // console.log('response.data', response.data);
        response.data.code = response.status
        response.data.message = response.statusText
        // if (response.data.code == 200) {

        //   if (response.data.errno == 501) {
        //     // 清除登录相关内容
        //     try {
        //       storage.remove({ key: "userInfo" })
        //     } catch (e) {
        //       // Do something when catch error
        //     }
        //     // 切换到登录页面
        //     console.error("need login");

        //   } else {
        //     return response.data;
        //   }
        // }
            return response.data;
      },
      (error) => {
        console.log('响应拦截到错误', error);
        if (error.message.indexOf('timeout') !== -1) {
          console.error(error.message);
          // window.$message.error('请求超时，请重试');
        }
        const statusCode = error.response.status as number;
        const errorResponse = error.response;
        const errorResponseData = errorResponse.data;
        const whiteList = ['400', '401', '403', '404', '500'];
        if (error.response) {
          if (!whiteList.includes(`${statusCode}`)) {
            // window.$message.error(error.message);
            return Promise.reject(error.message);
          }
          if (statusCode === 400) {
            console.error(errorResponseData.message);
            // window.$message.error(errorResponseData.message);
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 401) {
            console.error(errorResponseData.message);
            // window.$message.error(errorResponseData.message);
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 403) {
            console.error(errorResponseData.message);
            // window.$message.error(errorResponseData.message);
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 404) {
            console.error(errorResponseData.message);
            // window.$message.error(errorResponseData.message);
            return Promise.reject(errorResponseData);
          }
          if (statusCode === 500) {
            console.error(errorResponseData.error);
            // window.$message.error(errorResponseData.error);
            return Promise.reject(errorResponseData);
          }
        } else {
          // 请求超时没有response
          console.error(error.message);
          // window.$message.error(error.message);
          return Promise.reject(error.message);
        }
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
  baseURL: 'http://10.251.11.173:4523/m1/3898833-0-default',
  timeout: 1000 * 5,
});
