import { FC, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import * as API from "api";
import { ROUTE } from 'route';
import { usePlan } from "hooks/usePlan";
import { Modal } from "components/Modal";
import { Header } from 'components/Header';
import { Deposit } from 'components/Deposit';
import { fetchApi, useQuery } from "utils";
import * as Type from "domain/type/res/student";

export const StudentPage: FC = () => {
  const planList = usePlan();
  const history = useHistory();
  const status: API.Query = (useQuery().get('status') || API.Query.Join) as API.Query;
  const [studentList, setStudentList] = useState<Type.Student[]>();
  const [id, setId] = useState(0);
  const isShowModal = !!id;

  const getStudentList = (status: API.Query = API.Query.Join) => {
    fetchApi(API.getAllStudent(status))
      .then(setStudentList)
      .catch(console.log)
    ;
  };

  const handleChangeStatus: React.ChangeEventHandler<HTMLSelectElement> = ({ currentTarget }) => {
    history.push(`${ROUTE.STUDENT}?status=${currentTarget.value}`);
  };

  useEffect(() => {
    getStudentList(status);
  }, [status]);

  const closeModal = () => {
    setId(0);
  };

  const findStudent = (id: number) => {
    return studentList!.find(s => s.id === id) as Type.Student;
  };

  const changeStatus = (id: number, updateStatus: API.Query.Join | API.Query.Dropout) => {
    fetchApi(API.getStudent(id), {
      method: "post",
      withToken: true,
      body: {data: { status: updateStatus }}
    })
      .then(() => getStudentList(status));
  };

  // if(!planList) return null;

  return (
    <div>
      <Header />
      {studentList && (
        status !== API.Query.Dropout ?
          <div className="joinStudent">
            <select value={status} onChange={handleChangeStatus}>
              <option value={API.Query.Join}>全部</option>
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
      {isShowModal && planList &&
      <Modal>
        <Deposit {...{
          planList,
          closeModal,
          student: findStudent(id),
          depositDone: getStudentList,
        }} />
      </Modal>
      }
    </div>
  );
};