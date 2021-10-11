import { FC, useEffect, useState } from "react";

import * as API from "api";
import { fetchApi } from "utils";
import { Header } from "components/Header";
import * as Type from "domain/type/res/classroom";
import { Link } from "react-router-dom";
import { ROUTE } from "route";

export const ClassroomPage: FC = () => {
  const [classroomList, setClassroomList] = useState<Type.Class[]>();
  useEffect(() => {
    fetchApi(API.getClassRoom())
      .then(setClassroomList)
      .catch(console.error)
    ;
  }, []);

  return (
    <div>
      <Header />
      課程頁
      <p>
        <Link to={ROUTE.ROLLCALL}>點名</Link>
      </p>
      {classroomList && classroomList.map(classroom =>
        <div key={classroom.id}>
          <Link to={`${ROUTE.CLASS_EDIT}/?id=${classroom.id}`}>EDIT</Link><br />
          {classroom.date}<br />
          {classroom.students.map(student =>
            <span key={student.id}>{student.name}</span>
          )}
        </div>
      )}
    </div>
  );
};
