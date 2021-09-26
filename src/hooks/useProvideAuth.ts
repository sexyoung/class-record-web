// import LogRocket from 'logrocket';
import { useState, useEffect } from "react";

import * as API from "api";

export const useProvideAuth = (token: string) => {
  const [isAuth, setIsAuth] = useState<boolean | void>(undefined);

  const checkIsAuth = async () => {
    
    const res = await fetch(API.getTeacherInfo(), {
      headers: API.getHeaderWithToken(),
    });
    const { message, ...resData } = await res.json();
    if(message) throw new Error(message);
    
    return resData;
  };

  useEffect(() => {
    token && checkIsAuth()
    .then((res) => {
      console.log(res);
      setIsAuth(true);
    })
    .catch(e => { console.log('既然取得me失敗，那應該導回首頁', e.message) })
  }, [token]);

  return {
    isAuth,
    setIsAuth,
  };
};