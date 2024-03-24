import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { Views } from "types/navigation";

const authScreens: Views[] = [
  Views.Cart,
  Views.LiveRoom,
  Views.Live,
  Views.Mine,
];

export const isLogin = () => {
  const { Token } = useAppSelector((state) => state.user);
  console.log(Token);
  
  return !!Token;
};

export const canVisit = (logined: boolean, screen: Views) => {
  if (!authScreens.includes(screen)) return true;
  return logined;
};

export const useAuth = (screen: Views) => {
  const { Token } = useAppSelector((state) => state.user);
  const [canVisit, setCanVisit] = useState(true);
  const {} = useNavigation();
  useEffect(() => {
    if (!authScreens.includes(screen)) return;
    console.log("Token", Token);
    setCanVisit(!!Token);
  }, [Token]);
  return {
    canVisit,
  };
};
