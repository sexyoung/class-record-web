import { useContext, createContext } from "react";
import * as Type from "domain/type/res/teacher";

interface IAuth {
  teacher?: Type.Teacher;
  isAuth?: boolean | void;
  setIsAuth?: (isAuth: boolean) => void;
  setTeacher?: (teacher: Type.Teacher) => void;
}

export const authContext = createContext<IAuth>({});

export const useAuth = () => {
  return useContext(authContext);
};