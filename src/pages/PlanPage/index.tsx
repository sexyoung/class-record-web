import { FC } from 'react';

import { Header } from 'components/Header';

import style from './style.module.css';
import { usePlan } from 'hooks/usePlan';

export const PlanPage: FC = () => {
  const planList = usePlan();
  return (
    <div className={style.PlanPage}>
      <Header />
      編輯課程頁 (計劃頁)
      {planList && planList.map(plan =>
        <div key={plan.id}>
          {plan.name}/
          {plan.money}/
          {plan.times}/
          {plan.expiresDays}/
          {plan.isActive}
        </div>
      )}
    </div>
  );
};
