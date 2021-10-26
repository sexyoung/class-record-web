import cx from 'classnames';
import { FC, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { Student } from 'domain/type/res/student';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';

interface StatusChangerProps {
  student: Student;
  // closeModal: () => void;
  changeStatus: () => void;
  status: API.Query.Join | API.Query.Dropout,
}

const statusNameMap = {
  [API.Query.Join]: '復籍',
  [API.Query.Dropout]: '除籍',
};

export const StatusChanger: FC<StatusChangerProps> = ({ status, student, changeStatus }) => {
  return (
    <div className={style.StatusChanger}>
      <div className={style.title}>{statusNameMap[status]}</div>
      <div className={style.img} />
      <div className={style.name}>{student.name}</div>
      <button className={cx(btnStyle.btn, "w-full mt-3")} onClick={changeStatus}>
        {statusNameMap[status]}
      </button>
    </div>
  );
};
