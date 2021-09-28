import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE } from 'route';
import { clearApiToken } from 'utils';

import style from "./style.module.scss";

export const Header: FC = () => {

  return (
    <ul className={style.Header}>
      <li><Link to={ROUTE.CLASS}>CLASS</Link></li>
      <li><Link to={ROUTE.STUDENT}>STUDENT</Link></li>
      <li><Link to={ROUTE.HOME} onClick={clearApiToken}>LOGOUT</Link></li>
    </ul>
  );
};
