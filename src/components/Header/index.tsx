import cx from 'classnames';
import { FC, useState } from 'react';
import * as Icon from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import { Menu } from './Menu';
import { ROUTE } from 'route';

import style from "./style.module.css";
import comStyle from 'components/common.module.css';

export const Header: FC = () => {
  const history = useHistory();
  const pathname = history.location.pathname;
  const [isShowMenu, setIsShowMenu] = useState(false);

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

          <button onClick={setIsShowMenu.bind(null, true)} type="button" className="bg-lavender-200 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
            <Icon.MenuIcon className="w-5 h-5" />
          </button>

          <Menu isShow={isShowMenu} onClose={setIsShowMenu.bind(null, false)} />
        </div>
      </div>

    </nav>
  );
};
