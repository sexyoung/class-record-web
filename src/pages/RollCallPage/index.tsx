import cx from 'classnames';
import { useHistory } from "react-router";
import { useEffect, useState, FormEventHandler as FEH} from "react";

import * as API from "api";
import { ROUTE } from "route";
import * as Comp from "components";
import * as StudentType from "domain/type/res/student";

import style from './style.module.css';
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

const pad = (n: number) => `00${n}`.slice(-2);

const getDate = () => {
  const date = new Date();
  return date.getFullYear().toString() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
};

const getTime = () => {
  const date = new Date();
  return pad(date.getHours()) + ':' + pad(date.getMinutes());
};

export const RollCallPage = () => {
  const history = useHistory();

  useEffect(() => {
    API.getAllStudent(API.Query.Join).then(setStudentList);
  }, []);

  const [studentList, setStudentList] = useState<StudentType.Student[]>();

  const handleSubmit: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if(!formData.getAll("studentId").length) return alert('至少選一個學生');

    API.postClassRoom({
      date: `${formData.get("date")} ${formData.get("time")}`,
      studentIdList: formData.getAll("studentId") as string[],
    }).then(history.push.bind(null, ROUTE.CLASS));
  };

  return (
    <div className={style.RollCallPage}>
      <Comp.Header />
      {studentList &&
        <form onSubmit={handleSubmit}>
          <div className={style.datetime}>
            <input type="date" name="date" required className={inputStyle.input} defaultValue={getDate()} />
            <input type="time" name="time" required className={inputStyle.input} defaultValue={getTime()} />
          </div>
          <ul className={style.studentList}>
            {studentList.map((student) =>
              <li key={student.id}>
                <label>
                  <input type="checkbox" name="studentId" value={student.id} />
                  <span>{student.name}</span>
                </label>
              </li>
            )}
          </ul>
          <button className={cx(btnStyle.btn, 'w-full')}>點名</button>
        </form>
      }
    </div>
  );
};
