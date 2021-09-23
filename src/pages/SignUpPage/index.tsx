import { FC, FormEventHandler as FEH } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';
import * as API from "api";
import { setToken } from 'utils';


export const SignUpPage: FC = () => {
    const history = useHistory();

    const signUp: FEH<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const apiRequest = {
            name: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
        };
        fetch(API.postSignUp(), {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(apiRequest),
        })
        .then(res => res.json())
        .then(json => {
            setToken(json.token);
        });
        history.replace(ROUTE.AUTH);
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
