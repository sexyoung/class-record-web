import cx from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import * as API from "api";
import { ROUTE } from 'route';
import { useQuery } from "utils";
import * as Comp from 'components';
import { usePlan } from "hooks/usePlan";
import * as Type from "domain/type/res/student";

import style from "./style.module.css";
import inputStyle from 'components/input.module.css';

export const StudentPage: FC = () => {
  const planList = usePlan();
  const history = useHistory();
  const [modalStatus, setModalStatus] = useState("");
  const [studentList, setStudentList] = useState<Type.Student[]>();
  const status: API.Query = (useQuery().get('status') || API.Query.Join) as API.Query;
  const [modalType = '', id = ''] = modalStatus.split('-');

  const getStudentList = async (status: API.Query = API.Query.Join) => {
    await API.getAllStudent(status)
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
    setModalStatus("");
  };

  const findStudent = (id: number) => {
    return studentList!.find(s => s.id === id) as Type.Student;
  };

  const changeStatus = async (id: number, updateStatus: API.Query.Join | API.Query.Dropout) => {
    closeModal();
    await API.updateStudent(id, {data: { status: updateStatus }});
    await getStudentList(status);
  };

  return (
    <div className={style.StudentPage}>
      <Comp.Header />
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
                      <div className={style.info}>
                        <div className={style.img} />
                        <div className={style.name}>
                          <Link to={`${ROUTE.STUDENTPERSONAL}?id=${s.id}`}>{s.name}</Link>
                        </div>
                        <div className={style.expiredAt}>{s.expiresAt || '未儲值'}</div>
                      </div>
                      <div className={cx(style.progress, style[`step${s.rollcalls || 0}`])}>
                        {[...Array(s.planTimes || 1).keys()].map(() =>
                          <div className={style.bar} />
                        )}
                      </div>
                      <div className={style.buttonGroup}>
                        <button onClick={setModalStatus.bind(null, `deposit-${s.id}`)}>儲值</button>
                        <button onClick={setModalStatus.bind(null, `dropout-${s.id}`)}>除籍</button>
                      </div>
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
                      <div className={style.info}>
                        <div className={style.img} />
                        <div className={style.name}>
                          <Link to={`${ROUTE.STUDENTPERSONAL}?id=${s.id}`}>{s.name}</Link>
                        </div>
                        {/* <div className={style.expiredAt}>2021-10-31到期(未做)</div> */}
                      </div>
                      <div className={style.buttonGroup}>
                        <button onClick={setModalStatus.bind(null, `join-${s.id}`)}>復籍</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          }
        </>
      )}
      {modalType === 'deposit' && planList &&
        <Comp.Modal onClose={closeModal}>
          <Comp.Deposit {...{
            planList,
            closeModal,
            student: findStudent(+id),
            depositDone: getStudentList,
          }} />
        </Comp.Modal>
      }
      {[API.Query.Dropout, API.Query.Join].includes(modalType as (API.Query.Dropout | API.Query.Join)) &&
        <Comp.Modal onClose={closeModal}>
          <Comp.StatusChanger {...{
            closeModal,
            status: modalType as API.Query.Dropout | API.Query.Join,
            student: findStudent(+id),
            changeStatus: changeStatus.bind(null, +id, modalType as API.Query.Dropout | API.Query.Join),
          }} />
        </Comp.Modal>
      }
    </div>
  );
};