import { useEffect, useState } from "react";
import storage from "storage";

const getToken = async () => {
  try {
    const ret = await storage.load({
      key: "token",
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: false, // 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      syncInBackground: false,
    });
    return ret.token;
  } catch (error) {
    // console.warn(error);
    return null;
  }
};

export const useAuth = () => {
  return {
    isLogIned: !!getToken(),
  };
};
