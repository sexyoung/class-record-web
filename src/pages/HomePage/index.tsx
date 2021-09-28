import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';

export const HomePage: FC = () => {
  return (
    <div>
            首頁
      <br/>
      <Link to={ROUTE.LOGIN}>我要登入</Link>
      <br/>
      <Link to={ROUTE.SIGNUP}>尚未註冊</Link>
    </div>
  );
};
