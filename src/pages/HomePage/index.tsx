import { FC } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import * as Icon from '@heroicons/react/outline';

import { ROUTE } from 'route';

import grace from './grace.png';
import kelly from './kelly.png';
import sexyoung from './sexyoung.png';

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
        <div className={style.referrer}>
          <div className={style.img} style={{backgroundImage: `url(${grace})`}} />
          <div className={style.name}>Grace</div>
          <div className={style.title}>BetweenGos 職場才女 共同創辦人</div>
          <div className={style.text}>
          鴻鈞老祖望了一眼眼神冷冽的林坤，雙目之中，不由的掠過一絲震撼。

他怎麼也沒有想到，自己作爲天道化身，竟然都沒有保護準提周全。

不過，看準提這幅模樣，第十八重天四周觀戰的個仙府修士們，和嫦娥、王母等人，則都心中很是舒暢。

畢竟，西方教仗着西方二聖，在三界爲非作歹多年，早已引的一衆修士敢怒不敢言，而今林坤也算是替他們主持公道了。
          </div>
        </div>
        <div className={style.referrer}>
          <div className={style.img} style={{backgroundImage: `url(${kelly})`}} />
          <div className={style.name}>詩詩</div>
          <div className={style.title}>日本流行文化研究</div>
          <div className={style.text}>
          準提道人目光之中，閃過一抹狠辣，此刻的他，居然當着林坤的面，在鴻鈞老祖面前告起狀來。

不過，在他聲音響起的同時，鴻鈞老祖的臉色，卻是陡然一變，望向他的目光之中，閃過一抹厭惡。

顯然，雖然他召喚準提，前來加入對林坤的魔鬼試煉，卻並沒有真正拿他當做自己人。

就連方纔自己出手救他，也是因爲天命使然，準提不能這麼早就隕落，之後的三界大勢中，還有他的作用而已。
          </div>
        </div>
        <div className={style.referrer}>
          <div className={style.img} style={{backgroundImage: `url(${sexyoung})`}} />
          <div className={style.name}>Sexyoung</div>
          <div className={style.title}>音樂遊戲攻略指導</div>
          <div className={style.text}>
          看來經過這次的浩劫，他再想和林坤一對一的戰鬥，已經沒有這個資格了！

從他望向林坤的目光中，就可以看出，林坤在他的心中，留下了多大的陰影。

“天地共主魔鬼試煉已結束，從今日起，林坤，便是這九霄之內，新的天地共主，和我鴻鈞的第四位徒弟！”

鴻鈞老祖一手捻鬚，盤坐蒲團之上，望着已然褪去鯤鵬之身，傲然立於虛空之中的林坤，朗聲說道。

“爲了表彰他，今日，我便破例在此開壇講法，希望大家都認真聽！”

在他聲音響起的同時，虛空之中，一道道璀璨的金色蓮花，在一個個修士腳下，次第開放。
          </div>
        </div>
      </div>
    </div>
  );
};
