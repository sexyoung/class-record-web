import { FC, useEffect, useState, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { fetchApi } from "utils";
import { Header } from 'components/Header';
import * as Type from "domain/type/res/student";

export const StudentPersonalPage: FC = () => {
  const [student, setStudent] = useState<Type.Detail>();
  const [isEdit, setIsEdit] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  useEffect(() => {
    id && fetchApi(API.getStudent(+id))
      .then(setStudent);
  }, []);

  const finishEdit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    /** @fix 這邊只需 post 一次即可 */
    id && await fetchApi(API.getStudent(+id), {
      method: "post",
      withToken: true,
      body: {
        data: {name: formData.get("name")}
      }
    });

    id && await fetchApi(API.getStudent(+id), {
      method: "post",
      withToken: true,
      body: {
        data: {status: formData.get("status")}
      }
    });

    setIsEdit.bind(false);
  };

  if(!student) return null;

  console.log(student.records);

  return (
    <div>
      <Header />
      個人頁
      <h2><strong>此頁的編輯功能未完成</strong></h2>
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
          <div>{student.status}</div>
          <button>[完成]</button>
        </form>
      }
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
    </div>
  );
};
