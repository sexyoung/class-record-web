import { FC, useEffect, useState } from 'react';
import * as Type from 'domain/type/res/plan';
import { Header } from 'components/Header';
import * as API from "api";
import { fetchApi } from 'utils';

const Plan: FC<Type.IPlanData>  = ({money, times, expiresDays}) => {
  // const formatMoney = new Intl.NumberFormat('en_EN', { style: 'currency', currency: 'USD' }).format(money);
  return (
    <div>
      <input type="checkbox" />
      {money}
      {` ${times}次`}
      {` ${expiresDays}天`}
    </div>
  );
};

import style from './style.module.css';
import { usePlan } from 'hooks/usePlan';

export const PlanPage: FC = () => {
  const planList = usePlan();
  return (
    <div className={style.PlanPage}>
      <Header />
      編輯課程頁 (計劃頁)
      {planList && planList.map(plan =>
        <Plan {...plan} />
      )}
    </div>
  );
};
