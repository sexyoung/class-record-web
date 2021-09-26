import React, { ReactNode } from "react";

import { getCookie } from "utils";
import { authContext } from "hooks/useAuth";
import { useProvideAuth } from "hooks/useProvideAuth";

interface IProviderAuth {
  children: ReactNode;
}

export const ProvideAuth: React.FC<IProviderAuth> = ({ children }: IProviderAuth) => {
  const auth = useProvideAuth(getCookie().token);
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};