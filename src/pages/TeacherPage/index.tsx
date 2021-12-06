import { useEffect, useState } from "react";
import * as Comp from "components";
import * as API from "api";
import * as Type from "domain/type/res/teacher";
import style from './style.module.css';

export const TeacherPage = () => {
  const [teacher, setTeacher] = useState<Type.Detail>();

  const getTeacher = () => {
    API.getTeacherInfo()
      .then(setTeacher);
  };

  useEffect(() => {
    getTeacher();
  }, []);

  console.log("teacher", teacher);

  return (
    <div className={style.TeacherPage}>
      <Comp.Header />
      <div className={style.img} />
      {
        teacher &&
        <div  className={style.data}>
          <div className={style.title}>{teacher.id}</div>
          <div className={style.title}>{teacher.name}</div>
          <div className={style.title}>{teacher.email}</div>
        </div>
      }
    </div>
  );
};
