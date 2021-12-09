import cx from 'classnames';
import { FC, FormEventHandler as FEH } from 'react';

import { IPlanForm } from './type';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

export const PlanForm: FC<IPlanForm> = ({ title, submitText, plan, postPlan }) => {

  const handleSubmit: FEH<HTMLFormElement>  = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    postPlan({
      name: `${formData.get("name")}`,
      money: +formData.get("money")!,
      times: +formData.get("times")!,
      expiresDays: +formData.get("expiresDays")!
    });
  };

  return (
    <form onSubmit={handleSubmit} className={style.Deposit}>
      <div className={style.title}>{title}</div>
      <input name="name" className={cx(inputStyle.input, "mt-5")} defaultValue={plan?.name} placeholder="方案名稱" required />
      <input name="money" type="tel" className={cx(inputStyle.input, "mt-5")} defaultValue={plan?.money} placeholder="方案金額" required />
      <input name="times" type="tel" className={cx(inputStyle.input, "mt-5")} defaultValue={plan?.times} placeholder="可上堂數" required />
      <input name="expiresDays" type="tel" className={cx(inputStyle.input, "mt-5")} defaultValue={plan?.expiresDays} placeholder="可使用天數" required />
      <button className={cx(btnStyle.btn, "w-full mt-3")}>{submitText}</button>
    </form>
  );
};
