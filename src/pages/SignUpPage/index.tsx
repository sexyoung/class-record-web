import { FC, FormEventHandler as FEH } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';
import * as API from "api";
import { fetchApi, setApiToken } from 'utils';
import { useAuth } from 'hooks';

export const SignUpPage: FC = () => {
    const auth = useAuth();
    const history = useHistory();

    const signUp: FEH<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const apiRequest = {
            name: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };

        fetchApi(API.postSignUp(), {
            method: "post",
            withToken: false,
            body: apiRequest,
        })
        .then(json => {
            setApiToken(json.token);
            auth.setIsAuth!(true);
            history.replace(ROUTE.AUTH);
        });
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <div>註冊頁</div>
                <input type="text" name="username"　placeholder="username" required/><br/>
                <input type="text" name="email"　placeholder="email" required/><br/>
                <input type="password" name="password"　placeholder="password" required/><br/>
                <button>註冊</button>
            </form>
            <Link to={ROUTE.LOGIN}>已有帳號，我要登入</Link>
        </div>
    )
}
