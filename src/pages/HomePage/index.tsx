import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';

export const HomePage: FC = () => {
  return (
    <div>
      <p className="text-center text-3xl text-lavender-700">上課點點名</p>
      <p className="text-center text-sm text-lavender-700">輕&nbsp;鬆&nbsp;點&nbsp;名&nbsp;&nbsp;&nbsp;優&nbsp;雅&nbsp;管&nbsp;理</p>
      <br/>
      <Link to={ROUTE.LOGIN}>我要登入</Link>
      <br/>
      <Link to={ROUTE.SIGNUP}>尚未註冊</Link>
    </div>
  );
};
