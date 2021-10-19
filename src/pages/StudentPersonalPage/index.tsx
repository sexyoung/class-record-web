import {
  FC,
  useEffect,
  useState,
  FormEventHandler as FEH,
} from 'react';
import * as API from "api";
import { usePlan } from 'hooks/usePlan';
import { Modal } from 'components/Modal';
import { Header } from 'components/Header';
import { Deposit } from 'components/Deposit';
import * as Type from "domain/type/res/student";

export const StudentPersonalPage: FC = () => {
  const planList = usePlan();
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
    <div>
      <Header />
      {student && planList &&
        <>
          個人頁
          {!isEdit && student &&
          <div>
            <div>{student.name}</div>
            <div>{student.status}</div>
            <button onClick={setIsEdit.bind(null, true)}>[編輯]</button>
          </div>
          }
          {isEdit && student &&
            <form onSubmit={finishEdit}>
              <input type="text" name="name" defaultValue={student.name} placeholder="name" required />
              <input type="text" name="status" defaultValue={student.status} placeholder="status" required />
              <button>[完成]</button>
            </form>
          }
          <button onClick={setIsShowModal.bind(null, true)}>[儲值]</button>
          <ul>
            {student.records.map((record: Type.Deposit | Type.RollCall) =>
              <li key={`${record.type}-${record.id}`}>
                <span>{record.type}</span>
                <span>{record.date}</span>
                {record.type === 'deposit' &&
                  <span>過期日{record.data!.expiresAt}</span>
                }
              </li>
            )}
          </ul>
          {isShowModal &&
          <Modal>
            <Deposit {...{
              planList,
              closeModal,
              student,
              depositDone: getStudent,
            }} />
          </Modal>
          }
        </>
      }
    </div>
  );
};
