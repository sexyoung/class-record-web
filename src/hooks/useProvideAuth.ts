// import LogRocket from 'logrocket';
import { useState, useEffect } from "react";

import * as API from "api";
import { clearApiToken } from "utils";

export const useProvideAuth = (token: string) => {
  const [isAuth, setIsAuth] = useState<boolean | void>(undefined);

  const checkIsAuth = async () => {
    try {
      const { user } = await API.getTeacherInfo();
      return user;
    } catch (error) {
      throw new Error(error as string);
    }
  };

  useEffect(() => {
    if(token === undefined) return setIsAuth(false);

    checkIsAuth()
      .then((res) => {
        // console.log(res);
        setIsAuth(true);
      })
      .catch(e => {
        if(`${e}` === 'TypeError: Failed to fetch') return;
        clearApiToken();
        setIsAuth(false);
      });
  }, [token]);

  return {
    isAuth,
    setIsAuth,
  };
};