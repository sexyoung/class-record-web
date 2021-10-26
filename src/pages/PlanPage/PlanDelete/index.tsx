import cx from 'classnames';
import { FC, FormEventHandler as FEH } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';

interface PlanDeleteProps {
  plan: Plan;
  // closeModal: () => void;
  deletePlan: () => void;
}


export const PlanDelete: FC<PlanDeleteProps> = ({ plan, deletePlan }) => {
  return (
    <div className={style.StatusChanger}>
      <div className={style.title}>刪除方案</div>
      <div className={style.img} />
      <div className={style.name}>{plan.money}</div>
      <div className={style.name}>{plan.times}</div>
      <div className={style.name}>{plan.expiresDays}</div>
      <button className={cx(btnStyle.btn, "w-full mt-3")} onClick={deletePlan}>
      刪除方案
      </button>
    </div>
  );
};
