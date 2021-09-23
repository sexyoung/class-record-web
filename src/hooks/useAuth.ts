import { useContext, createContext } from "react";

interface IAuth {
  isAuth?: boolean | void;
  setIsAuth?: (isAuth: boolean) => void;
}

export const authContext = createContext<IAuth>({});

export const useAuth = () => {
  return useContext(authContext);
};