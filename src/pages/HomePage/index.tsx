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
      <div className={style.block}>
        <h2 className={style.title}>掌握學生出席狀況</h2>
        <div className={style.hint}>這邊放一張圖</div>
        <p className={style.text}>
          郭台銘說，關於BNT疫苗到貨將比原定時程更快更多，進度超前，相信中央流行疫情指揮中心也將很快會開放，有意願施打BNT的民眾都能排到，也會在原廠建議施打第二劑的時間點，安排後續接種進度。
        </p>
      </div>
      <div className={style.block}>
        <h2 className={style.title}>終生免費</h2>
        <p className={style.text}>
          是的沒錯，我們的服務完全免費。基本的功能即可完成你手邊的點名與管理工作。如果想要更進階的服務，我們也提供以下進階功能！
        </p>
      </div>
      <div className={style.block}>
        <h2 className={style.title}>職人推薦</h2>
      </div>
    </div>
  );
};
