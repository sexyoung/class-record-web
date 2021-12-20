import cx from 'classnames';
import { FC, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';
import { Student } from 'domain/type/res/student';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

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

    console.log("formData", formData.get("date"));

    await API.postDeposit({
      planId: +formData.get("plan")!,
      studentId: student.id,
      date: formData.get("date")!.toString()!,
    });

    depositDone();
    closeModal();
  };

  return (
    <form onSubmit={deposit} className={style.Deposit}>
      <div className={style.title}>儲值</div>
      <div className={style.img} />
      <div className={style.name}>{student.name}</div>
      <select name="plan" className={cx(inputStyle.input, "mt-5")}>
        {planList.map(plan =>
          <option key={plan.id} value={plan.id}>{plan.name}</option>
        )}
      </select>
      <div className={style.inputTitle}>儲值日期</div>
      <input name="date" type="date" required className={cx(inputStyle.input, "mt-0")} />
      <button className={cx(btnStyle.btn, "w-full mt-3")}>儲值</button>
    </form>
  );
};
