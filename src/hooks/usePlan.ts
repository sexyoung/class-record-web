import { useState, useEffect } from 'react';

import * as API from "api";
import { Plan } from 'domain/type/res/plan';

export const usePlan = () => {
  const [planList, setPlanList] = useState<Plan[]>();
  useEffect(() => {
    API.getPlan().then(setPlanList);
  }, []);
  return {planList, setPlanList};
};
