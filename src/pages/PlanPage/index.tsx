import { FC, useState, useEffect } from 'react';
import * as API from "api";
import * as Comp from 'components';
import * as Type from 'domain/type/res/plan';
import { usePlan } from 'hooks/usePlan';
import { PlanDelete } from './PlanDelete';
import style from './style.module.css';
import { formatMoney } from 'utils/format';

// const Plan: FC<Type.IPlanData>  = ({id, setId, money, times, expiresDays}) => {
//   const formatMoney = new Intl.NumberFormat().format(money);
//   return (
//     <div>
//       {` $${formatMoney} `}
//       {` ${times}次 `}
//       {` ${expiresDays}天 `}
//       <button> 編輯 </button>
//       <button onClick={setId.bind(null, id)}> 刪除 </button>
//     </div>
//   );
// };

export const PlanPage: FC = () => {
  const {planList, setPlanList} = usePlan();
  console.log("planList", planList);

  // const [modalStatus, setModalStatus] = useState("");
  // const [modalType = '', id = ''] = modalStatus.split('-');
  const [id, setId] = useState(0);



  const closeModal = () => {
    setId(0);
  };

  const deletePlan = async (id: number) => {
    closeModal();
    await API.delPlan(id);
    setPlanList(usePlan().planList);
  };

  return (
    <div className={style.PlanPage}>
      <Comp.Header />
      {planList && planList.map(plan =>
        // <Plan key={plan.id} {...plan} setId={setId} />
        <div key={plan.id}>
          {` $${formatMoney(plan.money)} `}
          {` ${plan.times}次 `}
          {` ${plan.expiresDays}天 `}
          <button> 編輯 </button>
          <button onClick={setId.bind(null, plan.id)}> 刪除 </button>
        </div>
      )}
      {!!id && planList &&
        <Comp.Modal onClose={closeModal}>
          <PlanDelete {...{
            plan: planList[planList.findIndex(plan => plan.id === id)],
            deletePlan: deletePlan.bind(null, +id)
          }} />
        </Comp.Modal>
      }
      <div>新增</div>
    </div>
  );
};
