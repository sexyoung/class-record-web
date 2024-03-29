import cx from 'classnames';
import { useHistory } from "react-router-dom";
import { FC, useEffect, useState, FormEventHandler as FEH } from "react";

import * as API from "api";
import { ROUTE } from "route";
import { useQuery } from "utils";
import * as Comp from "components";
import * as StudentType from "domain/type/res/student";
import * as ClassRoomType from "domain/type/res/classroom";

import style from './style.module.css';
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

export const ClassroomEditPage: FC = () => {
  const query = useQuery();
  const history = useHistory();
  const [classroom, setClassroom] = useState<ClassRoomType.Class>();
  const [studentList, setStudentList] = useState<StudentType.Student[]>();
  useEffect(() => {
    API.getClassRoom(+query.get('id')!).then(setClassroom);
    API.getAllStudent(API.Query.Join).then(setStudentList);
  }, [query.get('id')]);

  const handleSubmit: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if(!formData.getAll("studentId").length) return alert('至少選一個學生');

    API.updateClassRoom(+query.get('id')!, {
      date: `${formData.get("date")} ${formData.get("time")}`,
      studentIdList: formData.getAll("studentId") as string[],
    })
      .then(history.push.bind(null, ROUTE.CLASS));
  };

  return (
    <div className={style.ClassroomEditPage}>
      <Comp.Header />
      {classroom && studentList &&
        <form onSubmit={handleSubmit}>
          <input type="date" name="date" required className={inputStyle.input} defaultValue={classroom.date.slice(0, 10)} /><br />
          <input type="time" name="time" required className={inputStyle.input} defaultValue={classroom.date.slice(11)} /><br />
          <ul className={style.studentList}>
            {studentList.map(student =>
              <li key={student.id}>
                <label>
                  <input type="checkbox" name="studentId" value={student.id} defaultChecked={
                    classroom.students.some(s => s.id === student.id)
                  } />
                  <span>{student.name}</span>
                </label>
              </li>
            )}
          </ul>
          <button className={cx(btnStyle.btn, 'w-full')}>更新</button>
        </form>
      }
    </div>
  );
};
