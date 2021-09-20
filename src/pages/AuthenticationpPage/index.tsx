import { FC } from 'react'

export const AuthenticationpPage: FC = () => {
    return (
        <div>
            <div>認證頁</div>
            <input placeholder="四位驗證碼" />
            <button>驗證</button>
            {/* 沒token導到登入頁 */}
        </div>
    )
}
