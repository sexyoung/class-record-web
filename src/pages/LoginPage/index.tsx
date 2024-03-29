// import { Helmet } from "react-helmet";
import cx from 'classnames';
import * as Icon from '@heroicons/react/outline';
import { Link, useHistory } from "react-router-dom";
import { FC, useState, FormEventHandler as FEH, useEffect } from "react";

import * as API from "api";
import { ROUTE } from "route";
import { useAuth } from "hooks";
import { setApiToken, getCookie } from "utils";

import btnStyle from 'components/btn.module.css';
import comStyle from 'components/common.module.css';

export const LoginPage: FC = () => {
  const auth = useAuth();
  const history = useHistory();
  const [bg, setBg] = useState();
  const [error, setError] = useState<string>('');

  useEffect(() => {

    fetch('https://api.thecatapi.com/v1/images/search')
      .then(res => res.json())
      .then(([ img ]) => setBg(img.url));

    getCookie().token &&
      API.getTeacherInfo().catch(e => setError(`${e}`));
  }, []);

  const handleLogin: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiRequest = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    API.postLogin(apiRequest)
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

  if (auth.isAuth === undefined) return null;

  // if(auth.isAuth) return <Redirect to="/class" />;

  return (
    <div className="h-screen w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <Link to={ROUTE.HOME}>
            <Icon.ClipboardCheckIcon className={comStyle.logo} />
          </Link>
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl text-lavender-700">老師登入</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleLogin}>
            <div className="flex flex-col pt-4">
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="your@email.com"
                className="shadow appearance-none rounded-sm w-full py-2 px-3  text-lavender-700 mt-1 leading-tight focus:outline-none focus:ring ring-lavender-700 focus:bg-lavender-200"
              />
            </div>
            <div className="flex flex-col pt-4">
              <input
                type="password"
                id="password"
                required
                name="password"
                placeholder="Password"
                className="shadow appearance-none rounded-sm w-full py-2 px-3  text-lavender-700 mt-1 leading-tight focus:outline-none focus:ring ring-lavender-700 focus:bg-lavender-200"
              />
            </div>
            {error && <div>{error}</div>}
            <button className={cx(btnStyle.btn, "font-bold text-lg hover:bg-lavender-700 p-2 mt-8")}>
              登入
            </button>
          </form>
          <div className="text-lavender-700 text-center pt-12 pb-12">
            <p>沒有帳號？<Link to={ROUTE.SIGNUP} className="underline font-semibold">註冊一下</Link></p>
          </div>
        </div>

      </div>

      <div className="w-1/2 shadow-2xl">
        {bg && <img alt="hello" className="object-cover w-full h-screen hidden md:block" src={bg} />}
      </div>
    </div>
  );
};
