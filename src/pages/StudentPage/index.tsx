import { Link, useHistory } from "react-router-dom";
import { FC, useEffect, useState } from 'react';

import * as API from "api";
import { ROUTE } from 'route';
import { Header } from 'components/Header';
import { fetchApi, useQuery } from "utils";
import { Deposit } from 'components/Deposit';
import * as Type from "domain/type/res/student";
import { usePlan } from "hooks/usePlan";

export const StudentPage: FC = () => {
  const planList = usePlan();
  const history = useHistory();
  const status: API.Query = (useQuery().get('status') || API.Query.Join) as API.Query;
  const [studentList, setStudentList] = useState<Type.Student[]>([]);
  const [id, setId] = useState(0);
  const isShowModal = !!id;

  const getStudentList = (status: API.Query = API.Query.Join) => {
    fetchApi(API.getAllStudent(status))
      .then(setStudentList);
  };

  const handleChangeStatus: React.ChangeEventHandler<HTMLSelectElement> = ({ currentTarget }) => {
    history.push(`${ROUTE.STUDENT}?status=${currentTarget.value}`);
  };

  useEffect(() => {
    getStudentList(status);
  }, [status]);

  const closeDeposit = () => {
    setId(0);
  };

  const findStudent = (id: number) => {
    return studentList.find(s => s.id === id) as Type.Student;
  };

  const changeStatus = (id: number, updateStatus: API.Query.Join | API.Query.Dropout) => {
    fetchApi(API.getStudent(id), {
      method: "post",
      withToken: true,
      body: {data: { status: updateStatus }}
    })
      .then(() => getStudentList(status));
  };

  if(!planList) return null;

  return (
    <div>
      <Header />
      <div>-------學生頁-------</div>
      <Link to={`${ROUTE.STUDENT}?status=${API.Query.Join}`}>[在籍]</Link>
      <Link to={`${ROUTE.STUDENT}?status=${API.Query.Dropout}`}>[非在籍]</Link>
      {studentList.length && (
        status !== API.Query.Dropout ?
          <div className="joinStudent">
            <select value={status} onChange={handleChangeStatus}>
              <option value={API.Query.Join}>在籍</option>
              <option value={API.Query.Current}>有課</option>
              <option value={API.Query.Zero}>無課</option>
              <option value={API.Query.Debts}>欠課</option>
            </select>
            {studentList.map(s =>
              <div key={s.id}>
                <Link to={`${ROUTE.STUDENTPERSONAL}?id=${s.id}`}>{s.name}</Link>
                <button onClick={setId.bind(null, s.id)}>[儲值]</button>
                <button onClick={changeStatus.bind(null, s.id, API.Query.Dropout)}>[除籍]</button>
              </div>
            )}
          </div>:
          <div className="dropoutStudent">
            {studentList.map(s =>
              <div key={s.id}>
                <span>{s.name}</span>
                <button onClick={changeStatus.bind(null, s.id, API.Query.Join)}>[復藉]</button>
              </div>
            )}
          </div>
      )}
      {isShowModal && <Deposit {...{
        planList,
        closeDeposit,
        student: findStudent(id),
        getStudentList,
      }} />}
    </div>
  );
};