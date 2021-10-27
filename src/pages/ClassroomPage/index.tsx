import { Link } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import * as Icon from '@heroicons/react/solid';

import * as API from "api";
import { ROUTE } from "route";
import * as Comp from "components";
import * as Type from "domain/type/res/classroom";

import style from './style.module.css';

export const ClassroomPage: FC = () => {
  const [classroomList, setClassroomList] = useState<Type.Class[]>();
  useEffect(() => {
    API.getClassRoom()
      .then(setClassroomList)
      .catch(console.error)
    ;
  }, []);

  return (
    <div className={style.ClassroomPage}>
      <Comp.Header />
      <div className={style.classroomList}>
        {classroomList && classroomList.map(classroom =>
          <div key={classroom.id} className={style.classroom}>
            <div className={style.title}>
              <span className={style.date}>{classroom.date.slice(5, 16)}</span>
              <span>{classroom.students.length}人</span>
              <Link to={`${ROUTE.CLASS_EDIT}/?id=${classroom.id}`}>編輯</Link><br />
            </div>
            {classroom.students.map(student =>
              <span key={student.id} className={style.student}>{student.name}</span>
            )}
          </div>
        )}
      </div>
      <Link className={style.add} to={ROUTE.ROLLCALL}><Icon.PlusCircleIcon color="#926C9A" /></Link>
    </div>
  );
};
