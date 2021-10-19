import { FC, FormEventHandler as FEH, useState, useEffect } from 'react';

import * as API from "api";
import { fetchApi } from 'utils';
import { Header } from 'components/Header';

import style from './style.module.css';
import { Plan } from 'domain/type/res/plan';

export const PlanPage: FC = () => {
  const [planList, setPlanList] = useState<Plan[]>([]);
  useEffect(() => {
    fetchApi(API.getPlan())
      .then(setPlanList);
  }, []);
  return (
    <div className={style.PlanPage}>
      <Header />
      編輯課程頁 (計劃頁)
      {planList.map(plan =>
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
