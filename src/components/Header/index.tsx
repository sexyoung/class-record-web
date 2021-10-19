import { FC } from 'react';
import cx from 'classnames';
import * as Icon from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import { ROUTE } from 'route';
import { clearApiToken } from 'utils';

import style from "./style.module.css";
import comStyle from 'components/common.module.css';

export const Header: FC = () => {
  const history = useHistory();
  const pathname = history.location.pathname;

  return (
    <nav className={cx(style.Header, "bg-lavender-200")}>
      <div className="max-w-7xl mx-auto px-2">
        <div className="relative flex items-center justify-between">
          <div className="flex-1 flex items-stretch justify-start">
            {/* logo-start */}
            <Link to={ROUTE.CLASS}><Icon.ClipboardCheckIcon className={comStyle.logo} /></Link>
            {/* logo-end */}
            <div className="block ml-2">
              <div className={cx("flex space-x-1", style.nav, style[pathname.slice(1)])}>
                {/*  Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}
                <Link to={ROUTE.CLASS}>點名</Link>
                <Link to={ROUTE.STUDENT}>學生</Link>
                <Link to={ROUTE.PLAN}>方案</Link>
              </div>
            </div>
          </div>
          <div>
            <Link
              to={ROUTE.HOME}
              onClick={clearApiToken}
              className="text-gray-600 py-2 rounded-md text-sm font-medium"
            >
              <Icon.LogoutIcon className="w-5 h-5 text-lavender-500 hover:text-white w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
