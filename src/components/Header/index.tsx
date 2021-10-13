import { FC } from 'react';
import cx from 'classnames';
import * as Icon from '@heroicons/react/outline';
import { Link, useHistory } from 'react-router-dom';

import { ROUTE } from 'route';
import { clearApiToken } from 'utils';

import style from "./style.module.css";

export const Header: FC = () => {
  const history = useHistory();
  const pathname = history.location.pathname;

  return (
    <nav className="bg-lavender-200">
      <div className="max-w-7xl mx-auto px-2">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-stretch justify-start">
            {/* logo-start */}
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
              <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
            </div>
            {/* logo-end */}
            <div className="block ml-6">
              <div className="flex space-x-4">
                {/*  Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"  */}
                <Link
                  to={ROUTE.CLASS}
                  className={cx(style.navItem, {
                    [style.active]: pathname === ROUTE.CLASS
                  })}
                >
                  Class
                </Link>
                <Link
                  to={ROUTE.STUDENT}
                  className={cx(style.navItem, {
                    [style.active]: pathname === ROUTE.STUDENT
                  })}
                >
                  Student
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Link
              to={ROUTE.HOME}
              onClick={clearApiToken}
              className="text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              <Icon.LogoutIcon className="w-5 h-5 text-lavender-500 hover:text-white" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
