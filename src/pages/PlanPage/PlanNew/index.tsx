import cx from 'classnames';
import { FC, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

interface IPlanNew {
  newPlan: () => Promise<void>;
}

export const PlanNew: FC<IPlanNew> = ({ newPlan }) => {

  return (
    <form onSubmit={newPlan} className={style.Deposit}>
      <div className={style.title}>新增方案</div>
      <input name="plan" className={cx(inputStyle.input, "mt-5")} />
      <input name="plan" className={cx(inputStyle.input, "mt-5")} />
      <input name="plan" className={cx(inputStyle.input, "mt-5")} />
      <input name="plan" className={cx(inputStyle.input, "mt-5")} />
      <button className={cx(btnStyle.btn, "w-full mt-3")}>新增方案</button>
    </form>
  );
};
