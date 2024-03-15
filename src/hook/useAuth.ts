import { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { Views } from "types/navigation";

const authScreens: Views[] = [Views.Cart, Views.LiveRoom, Views.Live];

export const isLogin = () => {
  const { Token } = useAppSelector((state) => state.user);
  return !!Token;
};

export const useAuth = (screen: Views) => {
  const { Token } = useAppSelector((state) => state.user);
  const [canVisit, setCanVisit] = useState(true);
  useEffect(() => {
    if (!authScreens.includes(screen)) return;
    console.log("Token", Token);
    setCanVisit(!!Token);
  }, [Token]);
  return {
    canVisit,
  };
};
