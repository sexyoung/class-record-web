import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { FC, FormEventHandler as FEH, useState, useEffect } from 'react';

import * as API from "api";
import { ROUTE } from 'route';
import { useAuth } from 'hooks';
import { fetchApi, setApiToken } from 'utils';

type SignUpError = {
  name?: string;
  email?: string;
  password?: string;
}

export const SignUpPage: FC = () => {
  const auth = useAuth();
  const [error, setError] = useState<SignUpError>({});
  const history = useHistory();
  const [bg, setBg] = useState();

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search')
      .then(res => res.json())
      .then(([img]) => setBg(img.url));
  }, []);

  const handleSignUp: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError({});
    const formData = new FormData(e.currentTarget);
    const apiRequest = {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm"),
    };

    fetchApi(API.postSignUp(), {
      method: "post",
      withToken: false,
      body: apiRequest,
    })
      .then(json => {
        setApiToken(json.token);
        auth.setIsAuth!(true);
        history.replace(ROUTE.AUTH);
      })
      .catch((e) => {
        setError(JSON.parse(e.message).reduce((obj: object, row: any) => ({
          ...obj,
          [row.param]: row.msg,
        }), {}));
      })
      .finally(() => {
        console.log("hide the modal");
      });
    ;
  }

  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
          <Link to={ROUTE.HOME} className="bg-black text-white font-bold text-xl p-4">Logo</Link>
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">註冊點點名</p>
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSignUp}>
            <div className="flex flex-col pt-4">
              <label htmlFor="name" className="text-lg">姓名</label>
              <input required type="text" id="name" placeholder="ex: 李佳儀" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
              {error.name && <p className="text-red-500 text-xs italic">{error.name}</p>}
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">信箱</label>
              <input required type="email" id="email" placeholder="your@email.com" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
              {error.email && <p className="text-red-500 text-xs italic">{error.email}</p>}
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">密碼</label>
              <input required type="password" id="password" placeholder="輸入有一定複雜度的密碼" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
              {error.password && <p className="text-red-500 text-xs italic">{error.password}</p>}
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="confirm-password" className="text-lg">確認</label>
              <input required type="password" id="confirm-password" placeholder="再輸入一次您的密碼" name="passwordConfirm" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <button className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">註冊</button>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>已有帳號? <Link to={ROUTE.LOGIN} className="underline font-semibold">點這兒登入</Link></p>
          </div>
        </div>

      </div>

      <div className="w-1/2 shadow-2xl">
        {bg && <img className="object-cover w-full h-screen hidden md:block" src={bg} alt="Background" />}
      </div>
    </div>
  )
}
