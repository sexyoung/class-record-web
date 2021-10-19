import cx from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import * as API from "api";
import { ROUTE } from 'route';
import { useQuery } from "utils";
import { usePlan } from "hooks/usePlan";
import { Modal } from "components/Modal";
import { Header } from 'components/Header';
import { Deposit } from 'components/Deposit';
import * as Type from "domain/type/res/student";

import style from "./style.module.css";
import inputStyle from 'components/input.module.css';

export const StudentPage: FC = () => {
  const planList = usePlan();
  const history = useHistory();
  const [id, setId] = useState(0);
  const [studentList, setStudentList] = useState<Type.Student[]>();
  const status: API.Query = (useQuery().get('status') || API.Query.Join) as API.Query;
  const isShowModal = !!id;

  const getStudentList = (status: API.Query = API.Query.Join) => {
    API.getAllStudent(status)
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
    API.updateStudent(id, {data: { status: updateStatus }})
      .then(() => getStudentList(status));
  };

  return (
    <div className={style.StudentPage}>
      <Header />
      {studentList && (
        <>
          <nav className={cx(style.statusNav, style[status !== API.Query.Dropout ? 'join': 'dropout'])}>
            <ul>
              <li><Link to={ROUTE.STUDENT}>在籍學生</Link></li>
              <li><Link to={`${ROUTE.STUDENT}?status=${API.Query.Dropout}`}>除籍學生</Link></li>
            </ul>
          </nav>
          {status !== API.Query.Dropout ?
            <div className={style.joinStudent}>
              <select className={inputStyle.input} value={status} onChange={handleChangeStatus}>
                <option value={API.Query.Join}>全部</option>
                <option value={API.Query.Current}>有課</option>
                <option value={API.Query.Zero}>無課</option>
                <option value={API.Query.Debts}>欠課</option>
              </select>
              <div className={style.list}>
                {studentList.map(s =>
                  <div key={s.id} className={style.item}>
                    <div className={style.student}>
                      <Link to={`${ROUTE.STUDENTPERSONAL}?id=${s.id}`}>{s.name}</Link>
                      <button onClick={setId.bind(null, s.id)}>[儲值]</button>
                      <button onClick={changeStatus.bind(null, s.id, API.Query.Dropout)}>[除籍]</button>
                    </div>
                  </div>
                )}
              </div>
            </div>:
            <div className={style.dropoutStudent}>
              <div className={style.list}>
                {studentList.map(s =>
                  <div key={s.id} className={style.item}>
                    <div className={style.student}>
                      <span>{s.name}</span>
                      <button onClick={changeStatus.bind(null, s.id, API.Query.Join)}>[復藉]</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        </>
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