import { FC, FormEventHandler as FEH } from 'react';
import { fetchApi } from 'utils';
import * as API from "api";
import { Student } from 'domain/type/res/student';

interface IDeposit {
  student: Student;
  closeDeposit: () => void;
  getStudentList: () => void;
}

export const Deposit: FC<IDeposit> = ({ student, closeDeposit, getStudentList }) => {
  const deposit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const apiRequest = {
      planId: formData.get("plan"),
      studentId: student.id,
    };

    await fetchApi(API.postDeposit(), {
      method: "post",
      body:apiRequest,
    })
      .then(getStudentList);

    closeDeposit();

  };

  return (
    <form onSubmit={deposit}>
      <div>+++++++</div>
      <div>{student.name}</div>
      <select name="plan">
        <option value="1">1 classes</option>
        <option value="2">5 classes</option>
        <option value="3">8 classes</option>
      </select>
      <button>[儲值]</button>
      <button type="button" onClick={closeDeposit}>[取消]</button>
    </form>
  );
};
