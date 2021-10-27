import cx from 'classnames';
import { FC, FormEventHandler as FEH } from 'react';

import { IPlanData } from 'domain/type/res/plan';
import { IPlanEdit } from './type';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

export const PlanEdit: FC<IPlanEdit> = ({ plan, editPlan }) => {

  const handleSubmit: FEH<HTMLFormElement>  = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    editPlan({
      name: `${formData.get("name")}`,
      money: +formData.get("money")!,
      times: +formData.get("times")!,
      expiresDays: +formData.get("expiresDays")!
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.Deposit}>
      <div className={style.title}>編輯方案</div>
      <input name="name" className={cx(inputStyle.input, "mt-5")} defaultValue={plan.id}/>
      <input name="money" className={cx(inputStyle.input, "mt-5")} />
      <input name="times" className={cx(inputStyle.input, "mt-5")} />
      <input name="expiresDays" className={cx(inputStyle.input, "mt-5")} />
      <button className={cx(btnStyle.btn, "w-full mt-3")}>送出</button>
    </form>
  );
};
