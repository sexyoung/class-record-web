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
  const [bg, setBg] = useState();
  const [error, setError] = useState<string>('');

  useEffect(() => {

    fetch('https://api.thecatapi.com/v1/images/search')
      .then(res => res.json())
      .then(([ img ]) => setBg(img.url));

    getCookie().token &&
      fetchApi(API.getTeacherInfo()).catch(e => setError(`${e}`));
  }, []);

  const handleLogin: FEH<HTMLFormElement> = (e) => {
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

  if (auth.isAuth === undefined) return null;

  // if(auth.isAuth) return <Redirect to="/class" />;

  return (
    <div className="h-screen w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <Link
            to={ROUTE.HOME}
            className="bg-indigo-300 text-white font-bold text-xl p-4"
          >
            Logo
          </Link>
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl text-gray-500 font-bold">上課點點名</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleLogin}>
            <div className="flex flex-col pt-4">
              <input
                type="email"
                name="email"
                id="email"
                required defaultValue="sexyoung@gmail.com"
                placeholder="your@email.com"
                className="shadow appearance-none rounded w-full py-2 px-3  text-gray-500 mt-1 leading-tight focus:outline-none focus:ring ring-indigo-200"
              />
            </div>
            <div className="flex flex-col pt-4">
              <input
                type="password"
                id="password"
                required name="password"
                defaultValue="abc123"
                placeholder="Password"
                className="shadow appearance-none rounded w-full py-2 px-3  text-gray-500 mt-1 leading-tight focus:outline-none focus:ring ring-indigo-200"
              />
            </div>
            {error && <div>{error}</div>}
            <button className="rounded-md bg-indigo-300 text-white font-bold text-lg hover:bg-indigo-200 p-2 mt-8">
              登入
            </button>
          </form>
          <div className="text-gray-500 text-center pt-12 pb-12">
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
