// import LogRocket from 'logrocket';
import { useState, useEffect } from "react";

import * as API from "api";
// import { isBuilding } from 'utils';

export const useProvideAuth = (token: string) => {
  const [isAuth, setIsAuth] = useState<boolean | void>(undefined);

  const checkIsAuth = async () => {
    
    const res = await fetch(API.getTeacherInfo(), {
      headers: API.getHeaderWithToken(),
    });
    const user = await res.json();

    // if(!isBuilding()) {
    //   LogRocket.identify(user.id, {
    //     name: user.fb_name || user.google_name || user.fb_id,
    //     email: user.email,
    //   });
    // }

    return user;
  };

  useEffect(() => {
    token && checkIsAuth()
    .then(() => { setIsAuth(true) })
    .catch(e => { console.log(e.message) })
  }, [token]);

  return {
    isAuth,
    setIsAuth,
  };
};