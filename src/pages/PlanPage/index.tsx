import { FC, useState, useEffect } from 'react';
import * as API from "api";
import * as Comp from 'components';
import * as Type from 'domain/type/res/plan';
import { usePlan } from 'hooks/usePlan';
import { PlanDelete } from './PlanDelete';
import style from './style.module.css';
import { formatMoney } from 'utils/format';
import { PlanNew } from './PlanNew';

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

  const [modalStatus, setModalStatus] = useState("");
  // modalType: new, edit, delete
  const [modalType = '', id = ''] = modalStatus.split('-');
  // const [isEditing, setIsEditing] = useState(false);


  const closeModal = () => {
    setModalStatus("");
  };

  const deletePlan = async (id: string) => {
    closeModal();
    await API.delPlan(+id);
    setPlanList(usePlan().planList);
  };

  const newPlan = async () => {
    closeModal();
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
          <button onClick={setModalStatus.bind(null, `delete-${plan.id}`)}> 刪除 </button>
        </div>
      )}
      {modalType === "delete" && planList &&
        <Comp.Modal onClose={closeModal}>
          <PlanDelete {...{
            plan: planList[planList.findIndex(plan => plan.id === +id)],
            deletePlan: deletePlan.bind(null, id)
          }} />
        </Comp.Modal>
      }
      <div onClick={setModalStatus.bind(null, `new`)}>新增</div>
      {modalType === "new" &&
        <Comp.Modal onClose={closeModal}>
          <PlanNew {...{newPlan}}/>
        </Comp.Modal>
      }
    </div>
  );
};
