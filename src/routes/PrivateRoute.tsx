import { ReactNode } from "react";

import {
  Route,
  Redirect,
} from "react-router-dom";

import { ROUTE } from "route";
import { useAuth } from 'hooks';
import { getCookie } from "utils";

interface IPrivateRoute {
  path: string;
  children: ReactNode;
}

export const PrivateRoute: React.FC<IPrivateRoute> = ({ children, ...rest }: IPrivateRoute) => {
  const auth = useAuth();
  const token = getCookie();

  // 有 token 但目前還沒取得登入狀態
  if(token && auth.isAuth === undefined) return null;

  return (
    <Route
      exact                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      {...rest}
      render={({ location }) =>
        auth.isAuth ? children : (
          <Redirect
            to={`${ROUTE.LOGIN}/?location=${location.pathname}${location.search}`}
          />
        )
      }
    />
  );
};