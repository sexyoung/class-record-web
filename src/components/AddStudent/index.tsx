import cx from 'classnames';
import { FC, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

interface IaddStudent {
  planList: Plan[];
  closeModal: () => void;
  addStudentDone: () => void;
}

export const AddStudent: FC<IaddStudent> = ({ planList, closeModal, addStudentDone }) => {
  const deposit: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await API.addStudent({
      name: formData.get("name")!,
      planId: +formData.get("plan")!,
      date: formData.get("date")!.toString()!,
    });

    addStudentDone();
    closeModal();
  };

  return (
    <form onSubmit={deposit} className={style.Deposit}>
      <div className={style.title}>新增學生</div>
      <div className={style.img} />
      <input data-testid='name' name="name" className={cx(inputStyle.input, "mt-5")} placeholder="學生名稱" required />
      <select name="plan" className={cx(inputStyle.input, "mt-5")}>
        {planList.map(plan =>
          <option data-testid={plan.id} key={plan.id} value={plan.id}>{plan.name}</option>
        )}
      </select>
      <div className={style.inputTitle}>加入日期</div>
      <input data-testid='date' name="date" type="date" required className={cx(inputStyle.input, "mt-0")} />
      <button className={cx(btnStyle.btn, "w-full mt-3")}>新增</button>
    </form>
  );
};
