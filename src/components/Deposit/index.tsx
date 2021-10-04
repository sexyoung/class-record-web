import { FC, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { fetchApi } from 'utils';
import { Plan } from 'domain/type/res/plan';
import { Student } from 'domain/type/res/student';

interface IDeposit {
  planList: Plan[];
  student: Student;
  closeDeposit: () => void;
  getStudentList: () => void;
}

export const Deposit: FC<IDeposit> = ({ planList, student, closeDeposit, getStudentList }) => {
  const deposit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await fetchApi(API.postDeposit(), {
      method: "post",
      body: {
        planId: formData.get("plan"),
        studentId: student.id,
      },
    })
      .then(() => getStudentList());

    closeDeposit();
  };

  return (
    <form onSubmit={deposit}>
      <div>儲值?</div>
      <div>{student.name}</div>
      <select name="plan">
        {planList.map(plan =>
          <option key={plan.id} value={plan.id}>{plan.name}</option>
        )}
      </select>
      <button>[儲值]</button>
      <button type="button" onClick={closeDeposit}>[取消]</button>
    </form>
  );
};
