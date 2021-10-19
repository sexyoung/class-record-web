import { useEffect, useState, FormEventHandler as FEH} from "react";

import * as API from "api";
import { ROUTE } from "route";
import { useHistory } from "react-router";
import { Header } from "components/Header";
import * as StudentType from "domain/type/res/student";

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
    <div>
      <Header />
      {studentList &&
        <form onSubmit={handleSubmit}>
          date: <input type="date" name="date" required /><br />
          time: <input type="time" name="time" required /><br />
          <ul>
            {studentList.map((student) =>
              <li key={student.id}>
                <label>
                  <input type="checkbox" name="studentId" value={student.id} />
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
