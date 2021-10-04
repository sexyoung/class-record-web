import { useState, useEffect } from 'react';

import * as API from "api";
import { fetchApi } from 'utils';
import { Plan } from 'domain/type/res/plan';

export const usePlan = () => {
  const [planList, setPlanList] = useState<Plan[]>();
  useEffect(() => {
    fetchApi(API.getPlan()).then(setPlanList);
  }, []);
  return planList;
};
