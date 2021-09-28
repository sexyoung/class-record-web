import { useLocation } from "react-router-dom";
import { FC, useEffect, useState } from "react";

import * as API from "api";
import { fetchApi } from "utils";
import { Header } from "components/Header";
import * as StudentType from "domain/type/res/student";
import * as ClassRoomType from "domain/type/res/classroom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const ClassroomEditPage: FC = () => {
  const query = useQuery();
  const [classroom, setClassroom] = useState<ClassRoomType.Class>();
  const [studentList, setStudentList] = useState<StudentType.Student[]>();
  useEffect(() => {
    fetchApi(API.getClassRoom(+query.get('id')!)).then(setClassroom);
    fetchApi(API.getAllStudent(API.Query.Join)).then(setStudentList);
  }, [query.get('id')]);

  if(!classroom || !studentList) return null;

  console.log(studentList);

  return (
    <div>
      <Header />
      點名記錄修改頁<br />
      {classroom.date}

      <div>
        有來上課學生:
        {classroom.students.map(student =>
          <div key={student.id}>{student.name}</div>
        )}
      </div>
      <br />
      <div>
        所有學生:
        {studentList.map(student =>
          <div key={student.id}>{student.name}</div>
        )}
      </div>
    </div>
  );
};
