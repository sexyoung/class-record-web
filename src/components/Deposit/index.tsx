import { FC, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';
import { Student } from 'domain/type/res/student';

interface IDeposit {
  planList: Plan[];
  student: Student;
  closeModal: () => void;
  depositDone: () => void;
}

export const Deposit: FC<IDeposit> = ({ planList, student, closeModal, depositDone }) => {
  const deposit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    console.log(student);

    await API.postDeposit({
      planId: +formData.get("plan")!,
      studentId: student.id,
    });

    depositDone();
    closeModal();
  };

  return (
    <form onSubmit={deposit}>
      <div>儲值</div>
      <div>{student.name}</div>
      <select name="plan">
        {planList.map(plan =>
          <option key={plan.id} value={plan.id}>{plan.name}</option>
        )}
      </select>
      <button>[儲值]</button>
      <button type="button" onClick={closeModal}>[取消]</button>
    </form>
  );
};
