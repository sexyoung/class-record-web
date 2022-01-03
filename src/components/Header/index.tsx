import { FC, useState } from 'react';
import cx from 'classnames';
import * as Icon from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import { ROUTE } from 'route';
import { useAuth } from 'hooks';
import { clearApiToken } from 'utils';

import style from "./style.module.css";
import comStyle from 'components/common.module.css';

export const Header: FC = () => {
  const auth = useAuth();
  console.log("auth",auth);

  const history = useHistory();
  const pathname = history.location.pathname;
  const [isMenu, setIsMenu] = useState(false);

  return (
    <nav className={style.Header}>
      <div className="max-w-7xl mx-auto px-2">
        <div className="relative flex items-center justify-between">
          <div className="flex-1 flex items-stretch justify-start">
            <Link to={ROUTE.CLASS}><Icon.ClipboardCheckIcon className={comStyle.logo} /></Link>
            <div className="block ml-2">
              <div className={cx("flex space-x-1", style.nav, style[pathname.slice(1)])}>
                <Link to={ROUTE.CLASS}>點名</Link>
                <Link to={ROUTE.STUDENT}>學生</Link>
                <Link to={ROUTE.PLAN}>方案</Link>
              </div>
            </div>
          </div>

          <button onClick={setIsMenu.bind(null, !isMenu)} type="button" className="bg-lavender-200 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
            <Icon.MenuIcon className="w-5 h-5" />
          </button>

          {isMenu &&
          <div className={style.menuContainer}>
            {/* <div className={style.menuContent}> */}
            <div className={style.buttonContainer}>
              <div onClick={setIsMenu.bind(null, !isMenu)} className={style.menuButton} aria-expanded="false">
                <Icon.XIcon className="w-5 h-5" />
              </div>
            </div>
            <div className={style.profileContainer}>
              <div className={style.img} />
              {auth.teacher &&
                  <div>
                    <div className={style.title}>{auth.teacher.name}</div>
                    <div className={style.email}>{auth.teacher.email}</div>
                  </div>
              }
            </div>
            <div>
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <Link to={ROUTE.IMPORT} className={style.menuItem}>匯入資料</Link>
              <Link to={ROUTE.PASSWD} className={style.menuItem}>更改密碼</Link>
              <div className={style.menuItem}>老師請假</div>

              <div className={style.menuItem}>
                <Link
                  to={ROUTE.HOME}
                  onClick={clearApiToken}
                >
                  {/* <Icon.LogoutIcon className="w-5 h-5 text-lavender-500 hover:text-white" /> */}
                    登出
                </Link>
              </div>
            </div>
            {/* </div> */}
          </div>
          }

        </div>
      </div>

    </nav>
  );
};
