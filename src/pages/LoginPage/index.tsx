// import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { FC, useState, FormEventHandler as FEH, useEffect } from "react";

import * as API from "api";
import { ROUTE } from "route";
import { useAuth } from "hooks";
import { fetchApi, setApiToken, getCookie } from "utils";

export const LoginPage: FC = () => {
  const auth = useAuth();
  const history = useHistory();
  // const [token, setToken] = useState("");
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getCookie().token &&
      fetchApi(API.getTeacherInfo()).catch(e => setError(`${e}`));
  }, []);

  const login: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiRequest = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetchApi(API.postLogin(), {
      method: "post",
      withToken: false,
      body: apiRequest,
    })
      .then((data) => {
        setApiToken(data.token);
        auth.setIsAuth!(true);
        if (data.emailVerifiedAt) {
          history.push(ROUTE.CLASS);
        } else {
          history.replace(ROUTE.AUTH);
        }
      })
      .catch((e) => setError(`${e}`))
      .finally(() => {
        console.log("hide the modal");
      });
  };

  if(auth.isAuth === undefined) return null;

  // if(auth.isAuth) return <Redirect to="/class" />;

  return (
    <div>
      <div>登入頁</div>
      <form onSubmit={login}>
        <input type="text" name="email" placeholder="email" required defaultValue="sexyoung@gmail.com" /><br />
        <input type="password" name="password" placeholder="password" required defaultValue="abc123" /><br />
        <button>登入</button>
        {error && <div>{error}</div>}
      </form>
      <Link to={ROUTE.SIGNUP}>尚未註冊</Link>
    </div>
  );
};
