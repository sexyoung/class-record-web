import { FC, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { Header } from 'components/Header';
import * as API from "api";
import { fetchApi } from "utils";
import * as Type from "domain/type/res/student";
import { ROUTE } from 'route';
import { Deposit } from 'components/Deposit';

export const StudentPage: FC = () => {
  const [status, setStatus] = useState(API.Query.Join);
  const [studentList, setStudentList] = useState<Type.Student[]>([]);
  const [id, setId] = useState(0);
  const history = useHistory();
  // useQuery
  const getStudentList = () => {
    fetchApi(API.getAllStudent(status))
      .then(setStudentList);
  };

  useEffect(() => {
    getStudentList();
  }, [status, history]);

  const toPersonalPage = (id:number) => {
    const url = ROUTE.STUDENTPERSONAL + "?id=" + id;
    history.push(url);
  };

  const closeDeposit = () => {
    setId(0);
  };

  const findStudent = (id: number) => {
    console.log(studentList.find(s => s.id === id));
    return studentList.find(s => s.id === id) as Type.Student;
  };

  const changeStatus = (id: number, status: API.Query.Join | API.Query.Dropout) => {
    fetchApi(API.getOneStudent(id), {
      method: "post",
      withToken: true,
      body: {
        "data": {
          status
        }
      }
    });
  };

  return (
    <div>
      <Header />
      <div>-------學生頁-------</div>
      <button onClick={setStatus.bind(null, API.Query.Join)}>[在藉]</button>
      <button onClick={setStatus.bind(null, API.Query.Dropout)}>[非在藉]</button>
      {studentList.length && (
        status === API.Query.Join ?
          studentList.map(s =>
            <div key={s.id}>
              <div onClick={toPersonalPage.bind(null, s.id)}>{s.name}</div>
              <button onClick={setId.bind(null, s.id)}>[儲值]</button>
              <button onClick={changeStatus.bind(null, s.id, API.Query.Dropout)}>[除籍]</button>
            </div>
          ) :
          studentList.map(s =>
            <div key={s.id}>
              <div>{s.name}</div>
              <button onClick={changeStatus.bind(null, s.id, API.Query.Join)}>[復藉]</button>
            </div>
          )
      )}
      {!!id && <Deposit {...{
        closeDeposit,
        student: findStudent(id),
        getStudentList,
      }} />}
    </div>
  );
};