import { useHistory } from "react-router-dom";
import { FC, useEffect, useState, FormEventHandler as FEH } from "react";

import * as API from "api";
import { ROUTE } from "route";
import { useQuery, fetchApi } from "utils";
import { Header } from "components/Header";
import * as StudentType from "domain/type/res/student";
import * as ClassRoomType from "domain/type/res/classroom";

export const ClassroomEditPage: FC = () => {
  const query = useQuery();
  const history = useHistory();
  const [classroom, setClassroom] = useState<ClassRoomType.Class>();
  const [studentList, setStudentList] = useState<StudentType.Student[]>();
  useEffect(() => {
    fetchApi(API.getClassRoom(+query.get('id')!)).then(setClassroom);
    fetchApi(API.getAllStudent(API.Query.Join)).then(setStudentList);
  }, [query.get('id')]);

  const handleSubmit: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if(!formData.getAll("studentId").length) return alert('至少選一個學生');

    fetchApi(API.getClassRoom(+query.get('id')!), {
      method: "put",
      body: {
        date: `${formData.get("date")} ${formData.get("time")}`,
        studentIdList: formData.getAll("studentId"),
      }
    }).then(history.push.bind(null, ROUTE.CLASS));
  };

  return (
    <div>
      <Header />
      {classroom && studentList &&
        <form onSubmit={handleSubmit}>
          date: <input type="date" name="date" required defaultValue={classroom.date.slice(0, 10)} /><br />
          time: <input type="time" name="time" required defaultValue={classroom.date.slice(11)} /><br />
          <ul>
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
          <button>submit</button>
        </form>
      }
    </div>
  );
};
