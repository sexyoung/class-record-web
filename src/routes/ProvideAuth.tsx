import React, { ReactNode } from "react";

import * as API from "api";
import { authContext } from "hooks/useAuth";
import { useProvideAuth } from "hooks/useProvideAuth";

interface IProviderAuth {
  children: ReactNode;
}

export const ProvideAuth: React.FC<IProviderAuth> = ({ children }: IProviderAuth) => {
  const auth = useProvideAuth(API.getToken());
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};