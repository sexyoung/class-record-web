import { FC, useEffect, useState } from "react";

import * as API from "api";
import { fetchApi } from "utils";
import { Header } from "components/Header";
import * as Type from "domain/type/res/classroom";

export const ClassroomPage: FC = () => {
  const [classroom, setClassroom] = useState<Type.Class[]>();
  useEffect(() => {
    fetchApi(API.getClassRoom())
      .then(setClassroom)
  }, []);

  console.log(classroom);
  
  return (
    <div>
      <Header />
      課程頁
      {classroom && classroom.map(c => <div>{c.date}</div>)}
    </div>
  );
};
