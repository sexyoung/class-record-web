import { Header } from "components/Header";
import { FC } from "react";

export const ClassroomPage: FC = () => {
  return (
    <div>
      主頁
      <div style={{ border: "1px solid black" }}>
        課程A
        <br />
        日期
        <br />
        學生甲
        <br />
        學生乙
        <br />
        學生丙
      </div>
      <div style={{ border: "1px solid black" }}>
        課程B
        <br />
        日期
        <br />
        學生甲
        <br />
        學生乙
        <br />
        學生丙
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="flex-shrink-0"></div>
        <div>
          <Header />
          主頁
          <div style={{ border: "1px solid black" }}>
            課程A
            <br />
            日期
            <br />
            學生甲
            <br />
            學生乙
            <br />
            學生丙
          </div>
          <div style={{ border: "1px solid black" }}>
            課程B
            <br />
            日期
            <br />
            學生甲
            <br />
            學生乙
            <br />
            學生丙
          </div>
          <div className="text-xl font-medium text-black">ChitChat</div>
          <p className="text-gray-500">You have a new message!</p>
        </div>
      </div>
    </div>
  );
};
