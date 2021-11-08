import {
  FC,
  useEffect,
  useState,
  FormEventHandler as FEH,
} from 'react';
import * as API from "api";
import * as Comp from 'components';
import { usePlan } from 'hooks/usePlan';
import * as Type from "domain/type/res/student";

import style from './style.module.css';

export const StudentPersonalPage: FC = () => {
  const {planList} = usePlan();
  const [student, setStudent] = useState<Type.Detail>();
  const [isEdit, setIsEdit] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const getStudent = () => {
    id && API.getStudent(+id)
      .then(setStudent);
  };

  useEffect(() => {
    getStudent();
  }, [id]);

  const finishEdit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    id && API.updateStudent(+id, {
      data: {
        name: formData.get("name"),
        status: formData.get("status"),
      }
    });

    setIsEdit(false);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className={style.StudentPersonalPage}>
      <Comp.Header />
      {student && planList &&
        <div>
          {!isEdit && student &&
          <>
            <div className={style.img} />
            <div className="text-center">{student.name}</div>
            <div className="text-center">{student.status}</div>
            <button
              className="w-16 text-center"
              onClick={setIsEdit.bind(null, true)}
            >[編輯]</button>
          </>
          }
          {isEdit && student &&
            <form onSubmit={finishEdit} className="flex w-full">
              <input className="flex-1" type="text" name="name" defaultValue={student.name} placeholder="name" required />
              <input className="flex-1" type="text" name="status" defaultValue={student.status} placeholder="status" required />
              <button className="w-16 text-center">[完成]</button>
            </form>
          }
          <button onClick={setIsShowModal.bind(null, true)}>[儲值]</button>
          <div className={style.classroomList}>
            {student.records.map((record: Type.Deposit | Type.RollCall) =>
              <div key={`${record.type}-${record.id}`} className={style.classroom}>
                <div className={style.title}>
                  <span className={style.date}>{record.date}</span>
                  <span>{record.type}</span>
                  {record.type === 'deposit' &&
                  <div>過期日{record.data!.expiresAt}</div>
                  }
                </div>
              </div>
            )}
          </div>
          {isShowModal &&
          <Comp.Modal>
            <Comp.Deposit {...{
              planList,
              closeModal,
              student,
              depositDone: getStudent,
            }} />
          </Comp.Modal>
          }
        </div>
      }
    </div>
  );
};
