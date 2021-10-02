import { useEffect, useState, FormEventHandler as FEH} from "react";

import * as API from "api";
import { fetchApi } from "utils";
import { Header } from "components/Header";
import * as StudentType from "domain/type/res/student";
import { useHistory } from "react-router";
import { ROUTE } from "route";

export const RollCallPage = () => {

  const history = useHistory();

  useEffect(() => {
    fetchApi(API.getAllStudent(API.Query.Join)).then(setStudentList);
  }, []);

  const [studentList, setStudentList] = useState<StudentType.Student[]>();

  const handleSubmit: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if(!formData.getAll("studentId").length) return alert('至少選一個學生');

    fetchApi(API.getClassRoom(), {
      method: "post",
      body: {
        date: `${formData.get("date")} ${formData.get("time")}`,
        studentIdList: formData.getAll("studentId"),
      }
    }).then(history.push.bind(null, ROUTE.CLASS));
  };

  if(!studentList) return null;

  return (
    <div>
      <Header />
      點名頁面
      <form onSubmit={handleSubmit}>
        所有學生:
        <ul>
          {studentList.map((student, index) =>
            <li key={student.id}>
              <label>
                <input type="checkbox" name="studentId" value={student.id} />
                <span>{student.name}</span>
              </label>
            </li>
          )}
        </ul>
        date: <input type="date" name="date" required /><br />
        time: <input type="time" name="time" required /><br />
        <button>submit</button>
      </form>
    </div>
  );
};
