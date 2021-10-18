import cx from 'classnames';
import * as Icon from '@heroicons/react/outline';
import { Link, useHistory } from "react-router-dom";
import { FC, FormEventHandler as FEH } from "react";

import * as API from "api";
import { ROUTE } from "route";
import { fetchApi } from "utils";

import style from './style.module.css';
import btnStyle from 'components/btn.module.css';
import comStyle from 'components/common.module.css';

export const AuthenticationPage: FC = () => {
  const history = useHistory();

  const auth: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    fetchApi(API.getAuth(formData.get("code") as string))
      .then((json) => {
        if (json.message === 'TOKEN_INVALID') {
          return window.alert(json.message);
        }
        history.replace(ROUTE.CLASS);
      });
  };

  return (
    <div className={style.AuthenticationPage}>
      <Link to={ROUTE.HOME}>
        <Icon.ClipboardCheckIcon className={cx(comStyle.logo, style.logo)} />
      </Link>
      <div className={style.title}>信箱認證</div>
      <form onSubmit={auth}>
        <div className="flex flex-col mb-9">
          <input
            type="text"
            name="code"
            id="code"
            required
            placeholder="認證碼"
            className="shadow appearance-none rounded-sm w-full py-2 px-3  text-lavender-700 mt-1 leading-tight focus:outline-none focus:ring ring-lavender-700 focus:bg-lavender-200"
          />
          <div>沒收到? <span>點此重發(還沒做)</span></div>
        </div>
        <button className={cx(btnStyle.btn, "font-bold text-lg hover:bg-lavender-700")}>驗證</button>
        {/* 沒token導到登入頁 */}
      </form>
    </div>
  );
};
