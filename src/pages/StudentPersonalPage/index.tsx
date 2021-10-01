import { FC, useEffect, useState } from 'react';
import { fetchApi } from "utils";
import * as API from "api";
import * as Type from "domain/type/res/student";

export const StudentPersonalPage = () => {
  const [student, setStudent] = useState<Type.Student>();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  useEffect(() => {
    id && fetchApi(API.getOneStudent(+id))
      .then(setStudent);
  }, []);

  return (
    <div>
      個人頁
      {student &&
      <div>
        <div>{student.name}</div>
        <div>{student.status}</div>
      </div>
      }
    </div>
  );
};
