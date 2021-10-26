import { FC, useState, useEffect } from 'react';
import * as API from "api";
import * as Comp from 'components';
import * as Type from 'domain/type/res/plan';
import { usePlan } from 'hooks/usePlan';
import { PlanDelete } from './PlanDelete';
import style from './style.module.css';

const Plan: FC<Type.IPlanData>  = ({id, setId, money, times, expiresDays}) => {
  const formatMoney = new Intl.NumberFormat().format(money);
  return (
    <div>
      {` $${formatMoney} `}
      {` ${times}次 `}
      {` ${expiresDays}天 `}
      <button> 編輯 </button>
      <button onClick={setId(id)}> 刪除 </button>
    </div>
  );
};



export const PlanPage: FC = () => {
  const [planList, setPlanList] = useState(usePlan());
  // const planList = usePlan();
  const [modalStatus, setModalStatus] = useState("");
  // const [modalType = '', id = ''] = modalStatus.split('-');
  const [id, setId] = useState("");

  const formatMoney = new Intl.NumberFormat().format(money);

  const closeModal = () => {
    setModalStatus("");
  };

  const deletePlan = async (id: number) => {
    closeModal();
    await API.delPlan(id);
    setPlanList(usePlan());
  };

  return (
    <div className={style.PlanPage}>
      <Comp.Header />
      {planList && planList.map(plan =>
        // <Plan key={plan.id} {...plan} setId={setId} />
        <div>
          {` $${formatMoney} `}
          {` ${times}次 `}
          {` ${expiresDays}天 `}
          <button> 編輯 </button>
          <button onClick={setId(id)}> 刪除 </button>
        </div>
      )}

      {id &&
        <Comp.Modal onClose={closeModal}>
          <PlanDelete {...{
            plan: planList[id],
            deletePlan
          }} />
        </Comp.Modal>
      }
      <div>
        {/* <Link to={ROUTE.PLANNEW}>新增</Link> */}
      </div>
    </div>
  );
};
