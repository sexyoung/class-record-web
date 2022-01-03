import {
  FC,
  useState,
  useEffect,
  FormEventHandler as FEH,
} from 'react';
import cx from 'classnames';
import * as API from "api";
import * as Comp from 'components';
import { usePlan } from 'hooks/usePlan';
import * as Type from "domain/type/res/student";

import style from './style.module.css';
import comStyle from 'components/common.module.css';
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

const typeMapping = {
  rollcall: '上課',
  deposit: '儲值',
};

export const StudentPersonalPage: FC = () => {
  const {planList} = usePlan();
  const [isEdit, setIsEdit] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const [student, setStudent] = useState<Type.Detail>();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const modalType = modalStatus;

  const getStudent = () => {
    id && API.getStudent(+id)
      .then(setStudent);
  };

  useEffect(getStudent, [id]);

  const finishEdit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    await API.updateStudent(+id!, {
      data: {
        name: formData.get("name"),
      }
    });

    getStudent();
    setIsEdit(false);
  };

  const closeModal = () => {
    setModalStatus("");
  };

  const changeStatus = async (id: number, updateStatus: API.Query.Join | API.Query.Dropout) => {
    closeModal();
    await API.updateStudent(id, {data: { status: updateStatus }});
    await getStudent();
  };

  return (
    <div className={style.StudentPersonalPage}>
      <Comp.Header />
      {student && planList &&
        <div className={style.student}>
          {student &&
          <>
            <div className={style.img} />
            <div className={style.name}>
              {isEdit ?
                <form onSubmit={finishEdit}>
                  <input id="nameDOM" type="text" name="name" defaultValue={student.name} required />
                  <div className={style.buttonGroup}>
                    <button>更名</button>
                    <button onClick={setIsEdit.bind(null, false)}>取消</button>
                  </div>
                </form>:
                <>
                  <span onClick={setIsEdit.bind(null, true)}>{student.name}</span>
                  <div className={style.edit}>編輯</div>
                </>
              }
            </div>
            <div className={style.expiresAt} >
              {student.expiresAt ? `${student.expiresAt.slice(0, 10)} 到期`: '未儲值'}
            </div>
            <div className={cx(comStyle.progress, comStyle[`step${student.rollcalls || 0}`])}>
              {[...Array(student.planTimes || 1).keys()].map(i =>
                <div key={i} className={comStyle.bar} />
              )}
              {student.times < 0 && [...Array(Math.abs(student.times)).keys()].map(i =>
                <div key={i} className={cx(comStyle.bar, comStyle.debts)} />
              )}
            </div>
            <div className={style.buttonGroup}>
              <button onClick={setModalStatus.bind(null, `deposit`)}>儲值</button>
              {student.status === API.Query.Join &&
                <button onClick={setModalStatus.bind(null, API.Query.Dropout)}>除籍</button>
              }
              {student.status === API.Query.Dropout &&
                <button onClick={setModalStatus.bind(null, API.Query.Join)}>復籍</button>
              }
            </div>
          </>
          }
          <div className={style.classroomList}>
            {student.records.map((record: Type.Deposit | Type.RollCall) =>
              <div key={`${record.type}-${record.id}`} className={style.classroom}>
                <div className={style.title}>
                  <span className={style.date}>{record.date.toString().slice(5)}</span>
                  <span>
                    {typeMapping[record.type]}
                    {record.type === 'deposit' && record.data!.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      }
      {modalType === 'deposit' && planList &&
        <Comp.Modal onClose={closeModal}>
          <Comp.Deposit {...{
            planList,
            closeModal,
            student: student as Type.Student,
            depositDone: getStudent,
          }} />
        </Comp.Modal>
      }
      {[API.Query.Dropout, API.Query.Join].includes(modalType as (API.Query.Dropout | API.Query.Join)) &&
        <Comp.Modal onClose={closeModal}>
          <Comp.StatusChanger {...{
            status: modalType as API.Query.Dropout | API.Query.Join,
            student: student as Type.Student,
            changeStatus: changeStatus.bind(null, +id!, modalType as (API.Query.Dropout | API.Query.Join)),
          }} />
        </Comp.Modal>
      }
    </div>
  );
};
