import { FC } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import * as Icon from '@heroicons/react/outline';

import { ROUTE } from 'route';

import style from './style.module.css';
import btnStyle from 'components/btn.module.css';

export const HomePage: FC = () => {
  return (
    <div className={style.HomePage}>
      <div className={style.hero}>
        <Icon.ClipboardCheckIcon className={style.logo} />
        <p className={style.title}>上課點點名</p>
        <p className={style.subtitle}>輕鬆點名 優雅管理</p>
        <Link to={ROUTE.SIGNUP} className={cx(btnStyle.btn, style.signup)}>老師註冊</Link>
        <Link to={ROUTE.LOGIN} className={style.login}>已註冊? 點此登入</Link>
      </div>
    </div>
  );
};
