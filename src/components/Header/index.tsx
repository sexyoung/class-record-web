import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import { ROUTE } from 'route';
import { clearApiToken } from 'utils';

import style from "./style.module.scss";

export const Header: FC = () => {
  const history = useHistory();
  const logOut = () => {
    clearApiToken();
    history.push(ROUTE.HOME);
  }

  return (
    <ul className={style.Header}>
      <li><Link to={ROUTE.CLASS}>CLASS</Link></li>
      <li><Link to={ROUTE.STUDENT}>STUDENT</Link></li>
      <li onClick={logOut}>LOGOUT</li>
    </ul>
  )
}
