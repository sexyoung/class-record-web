import { FC, useState } from 'react';
import * as API from "api";
import * as Comp from 'components';
import * as Type from 'domain/type/res/plan';
import { usePlan } from 'hooks/usePlan';
import { PlanDelete } from './PlanDelete';
import { formatMoney } from 'utils/format';

import { PlanForm } from './PlanForm';
import * as Icon from '@heroicons/react/solid';
import style from './style.module.css';
import comStyle from 'components/common.module.css';


export const PlanPage: FC = () => {
  const {planList, fetch} = usePlan();
  const [modalStatus, setModalStatus] = useState("");
  // modalType: new, edit, delete
  const [modalType = '', id = ''] = modalStatus.split('-');

  const closeModal = () => {
    setModalStatus("");
  };

  const deletePlan = async (id: string) => {
    closeModal();
    await API.delPlan(+id).then(fetch);
  };

  const genPlanFunc = (action: 'new' | 'edit') => {
    return async (params: Type.IPlanData) => {
      closeModal();
      if(action === 'edit') await API.editPlan({id: +id, ...params});
      else if(action === 'new') await API.newPlan(params);
      fetch();
    };
  };

  const newPlan = genPlanFunc('new');
  const editPlan = genPlanFunc('edit');

  return (
    <div className={style.PlanPage}>
      <Comp.Header />
      <div className={style.planContainer}>
        {planList && planList.map(plan =>
        // <Plan key={plan.id} {...plan} setId={setId} />
          <div className={style.plan} key={plan.id}>
            <p className="w-18">{`${plan.name}`}</p>
            <p className="w-16">{`$${formatMoney(plan.money)}`}</p>
            <p className="w-8">{`${plan.times}次`}</p>
            <p className="w-10">{`${plan.expiresDays}天`}</p>
            <button onClick={setModalStatus.bind(null, `edit-${plan.id}`)}> 編輯 </button>
            <button onClick={setModalStatus.bind(null, `delete-${plan.id}`)}> 刪除 </button>
          </div>
        )}
      </div>
      {modalType === "edit" && planList &&
        <Comp.Modal onClose={closeModal}>
          <PlanForm {...{
            title: "修改方案",
            submitText: "送出",
            plan: planList[planList.findIndex(plan => plan.id === +id)],
            postPlan: editPlan,
          }} />
        </Comp.Modal>
      }

      {modalType === "delete" && planList &&
        <Comp.Modal onClose={closeModal}>
          <PlanDelete {...{
            plan: planList[planList.findIndex(plan => plan.id === +id)],
            deletePlan: deletePlan.bind(null, id),
          }} />
        </Comp.Modal>
      }
      <div
        onClick={setModalStatus.bind(null, `new`)}
        className={style.addPlan}
      >
        <Icon.PlusCircleIcon className={comStyle.create} />
      </div>
      {modalType === "new" &&
        <Comp.Modal onClose={closeModal}>
          <PlanForm {...{
            title: "新增方案",
            submitText: "新增方案",
            postPlan: newPlan,
          }}/>
        </Comp.Modal>
      }
    </div>
  );
};
