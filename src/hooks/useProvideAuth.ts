// import LogRocket from 'logrocket';
import { useState, useEffect } from "react";

import * as API from "api";
import { clearApiToken } from "utils";

export const useProvideAuth = (token: string) => {
  const [isAuth, setIsAuth] = useState<boolean | void>(undefined);

  const checkIsAuth = async () => {

    const res = await fetch(API.getTeacherInfo(), {
      headers: API.getHeaderWithToken(),
    });

    if (!res.ok) throw new Error(res.statusText);

    const user = await res.json();
    return user;
  };

  useEffect(() => {
    if(token === undefined) return setIsAuth(false);

    checkIsAuth()
      .then((res) => {
        console.log(res);
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