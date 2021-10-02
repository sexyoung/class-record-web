import { FC, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import { Header } from 'components/Header';
import * as API from "api";
import { fetchApi } from "utils";
import * as Type from "domain/type/res/student";
import { ROUTE } from 'route';

export const StudentPage: FC = () => {
  const [status, setStatus] = useState(API.Query.Join);
  const [student, setStudent] = useState<Type.Student[]>([]);
  const history = useHistory();
  // useQuery
  useEffect(() => {
    fetchApi(API.getAllStudent(status))
      .then(setStudent);
  }, [status, history]);

  const deposit = (id:number) => {
    const apiRequest = {
      // ！！！！記得改
      planId: 3,
      studentId: id,
    };
    fetchApi(API.postDeposit(), {
      method: "post",
      body:apiRequest,
    });
  };

  const toPersonalPage = (id:number) => {
    const url = ROUTE.STUDENTPERSONAL + "?id=" + id;
    history.push(url);
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
      -------學生頁-------
      <button onClick={setStatus.bind(null, API.Query.Join)}>在藉</button>
      <button onClick={setStatus.bind(null, API.Query.Dropout)}>非在藉</button>
      {student && (
        status === API.Query.Join ?
          student.map(s =>
            <div key={s.id}>
              <div onClick={toPersonalPage.bind(null, s.id)}>{s.name}</div>
              <button onClick={deposit.bind(null, s.id)}>儲值</button>
              <button onClick={changeStatus.bind(null, s.id, API.Query.Dropout)}>除籍</button>
            </div>
          ) :
          student.map(s =>
            <div key={s.id}>
              <div>{s.name}</div>
              <button onClick={changeStatus.bind(null, s.id, API.Query.Join)}>復藉</button>
            </div>
          )
      )}
    </div>
  );
};