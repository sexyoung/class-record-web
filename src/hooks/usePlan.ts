import { useState, useEffect } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';

export const usePlan = () => {
  const [planList, setPlanList] = useState<Plan[]>();

  const fetch = () => {
    API.getPlan().then(setPlanList);
  };

  useEffect(() => {
    fetch();
  }, []);
  return {
    fetch,
    planList,
    setPlanList,
  };
};
