import { Header } from 'components/Header';
import { FC } from 'react';

export const ClassroomPage: FC = () => {
    return (
        <div>
            <Header />
            主頁
            <div style={{border: "1px solid black"}}>
                課程A
                <br/>
                日期
                <br/>
                學生甲
                <br/>
                學生乙
                <br/>
                學生丙
            </div>
            <div style={{border: "1px solid black"}}>
                課程B
                <br/>
                日期
                <br/>
                學生甲
                <br/>
                學生乙
                <br/>
                學生丙
            </div>
        </div>
    )
}
