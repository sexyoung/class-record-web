import { FC, FormEventHandler as FEH } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';
import * as API from "api";

export const LoginPage: FC = () => {
    const history = useHistory();
    
    const login: FEH<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const apiRequest = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        fetch(API.postLogin(), {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(apiRequest),
        })
        .then(res => res.json())
        .then(json => {
            // console.log("jsonjsonjson", json);
            if(json.emailVerifiedAt) {
                document.cookie = `status=${json.token}; expires=${new Date(+new Date() + 86400000).toUTCString()}`;
                history.replace(ROUTE.CLASS);
            } else {
                history.replace(ROUTE.AUTH);
            }
        
        });
    }

    return (
        <div>
            <form onSubmit={login}>
                <div>登入頁</div>
                <input type="text" name="email"　placeholder="email" required/><br/>
                <input type="password" name="password"　placeholder="password" required/><br/>
                <button>登入</button>
            </form>
            <Link to={ROUTE.SIGNUP}>尚未註冊</Link>
        </div>
    )
}
