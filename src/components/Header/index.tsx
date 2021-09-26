import { FC } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';
import { clearApiToken } from 'utils';

export const Header: FC = () => {
  const history = useHistory();
  const logOut = () => {
    clearApiToken();
    history.push(ROUTE.HOME);
  }

  return (
    <div>
      <div><Link to={ROUTE.CLASS}>CLASS</Link></div>
      <div><Link to={ROUTE.STUDENT}>STUDENT</Link></div>
      <div onClick={logOut}>LOGOUT</div>
    </div>
  )
}
