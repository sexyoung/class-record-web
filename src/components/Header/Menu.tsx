import cx from "classnames";
import { FC } from "react";
import { Link } from "react-router-dom";
import * as Icon from '@heroicons/react/outline';

import { ROUTE } from "route";
import { useAuth } from "hooks";
import { clearApiToken } from 'utils';
import style from "./Menu.module.css";

interface IMenu {
  isShow: boolean;
  onClose: () => void;
}

export const Menu: FC<IMenu> = (props) => {
  const auth = useAuth();
  return (
    <div className={cx(style.Menu, {[style.show]: props.isShow})}>
      <div className={style.buttonContainer}>
        <div onClick={props.onClose} className={style.menuButton} aria-expanded="false">
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
        <Link to={ROUTE.IMPORT} className={style.menuItem}>匯入資料</Link>
        <Link to={ROUTE.PASSWD} className={style.menuItem}>更改密碼</Link>
        <Link to={ROUTE.POSTPONE} className={style.menuItem}>老師請假</Link>

        <div className={style.menuItem}>
          <Link to={ROUTE.HOME} onClick={clearApiToken}>
            登出
          </Link>
        </div>
      </div>
    </div>
  );
};
