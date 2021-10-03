import { FC, useEffect, useState, FormEventHandler as FEH } from 'react';
import { fetchApi } from "utils";
import * as API from "api";
import * as Type from "domain/type/res/student";

export const StudentPersonalPage: FC = () => {
  const [student, setStudent] = useState<Type.Student>();
  const [isEdit, setIsEdit] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  useEffect(() => {
    id && fetchApi(API.getOneStudent(+id))
      .then(setStudent);
  }, []);

  const finishEdit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    id && await fetchApi(API.getOneStudent(+id), {
      method: "post",
      withToken: true,
      body: {
        data: {
          name: formData.get("name")
        }
      }
    });

    id && await fetchApi(API.getOneStudent(+id), {
      method: "post",
      withToken: true,
      body: {
        data: {
          status: formData.get("status")
        }
      }
    });

    setIsEdit.bind(false);
  };

  return (
    <div>
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
        <div>{student.status}</div>
        <button>[完成]</button>
      </form>
      }
    </div>
  );
};
