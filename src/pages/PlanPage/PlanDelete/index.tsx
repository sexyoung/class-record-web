import cx from 'classnames';
import { FC, FormEventHandler as FEH, MouseEventHandler } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';

import style from "./style.module.css";
import btnStyle from 'components/btn.module.css';
import { formatMoney } from 'utils/format';

interface PlanDeleteProps {
  plan: Plan;
  deletePlan: () => Promise<void>;
}

export const PlanDelete: FC<PlanDeleteProps> = ({ plan, deletePlan }) => {
  const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
    deletePlan();
  };

  return (
    <div className={style.PlanDelete}>
      <div className={style.title}>刪除方案</div>
      <div className={style.name}>{`${plan.name}方案（目前有${"[沒給參數]"}人使用）`}</div>
      <div className={style.name}>{`$${formatMoney(plan.money)}`}</div>
      <div className={style.name}>{`${plan.times}次`}</div>
      <div className={style.name}>{`${plan.expiresDays}天`}</div>
      {/* TODO待改參數 */}
      {true && <button className={cx(btnStyle.btn, "w-full mt-3")} onClick={handleDelete}>
      刪除方案
      </button>}
    </div>
  );
};
