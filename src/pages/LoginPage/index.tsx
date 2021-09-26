import { FC, FormEventHandler as FEH } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';
import * as API from "api";
import { setToken } from 'utils';

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
        .then(res => {
            console.log(res);
            if(res.status !== 200) {
                // 觸發錯誤語法
                throw new Error("帳號或密碼錯誤");
            }
            return res.json()
        })
        .then(json => {
            setToken(json.token);
            if(json.emailVerifiedAt) {
                history.replace(ROUTE.CLASS);
            } 

            else {
                history.replace(ROUTE.AUTH);
            }
        
        })
        .catch( err => {
            alert(err);
        })
        ;
    }

    return (
        <div>
            <div>登入頁</div>
            <form onSubmit={login}>
                <input type="text" name="email"　placeholder="email" required defaultValue="kellyu621@gmail.com"/><br/>
                <input type="password" name="password"　placeholder="password" required defaultValue="790621"/><br/>
                <button>登入</button>
            </form>
            <Link to={ROUTE.SIGNUP}>尚未註冊</Link>
        </div>
    )
}
