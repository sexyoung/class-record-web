import { FC } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE } from 'route'

export const SignUpPage: FC = () => {
    return (
        <div>
            註冊頁
            <div>
                姓名<input />
            </div>
            <div>
                email<input />
            </div>
            <Link to={ROUTE.FINISHED}>註冊</Link>
        </div>
    )
}
