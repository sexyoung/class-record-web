import { FC } from 'react';
import * as Comp from 'components';
import * as Type from 'domain/type/res/plan';

const Plan: FC<Type.IPlanData>  = ({money, times, expiresDays}) => {
  const formatMoney = new Intl.NumberFormat().format(money);
  return (
    <div>
      {` $${formatMoney} `}
      {` ${times}次 `}
      {` ${expiresDays}天 `}
      <Link to={ROUTE.PLANEDIT}> 編輯 </Link>
      <Link to={ROUTE.PLANDEL}> 刪除 </Link>
    </div>
  );
};

import style from './style.module.css';
import { usePlan } from 'hooks/usePlan';
import { Link } from 'react-router-dom';
import { ROUTE } from 'route';

export const PlanPage: FC = () => {
  const planList = usePlan();
  return (
    <div className={style.PlanPage}>
      <Comp.Header />
      {planList && planList.map(plan =>
        <Plan key={plan.id} {...plan} />
      )}
      <div>
        <Link to={ROUTE.PLANNEW}>新增</Link>
      </div>
    </div>
  );
};
