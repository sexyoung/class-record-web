import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE } from 'route'
// import { Link } from 'react-router-dom'

export const LoginPage: FC = () => {
    return (
        <div>
            登入頁
            <div>
                帳號<input />
            </div>
            <div>
                密碼<input />
            </div>
            <Link to={ROUTE.MAIN}>已認證登入</Link>
            <br/>
            <Link to={ROUTE.AUTH}>未認證登入</Link>
            {/* <Link>尚未註冊</Link> */}
        </div>
    )
}
