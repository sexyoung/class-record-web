import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import * as API from "api";
import { ROUTE } from "route";
import { Plan } from 'domain/type/res/plan';

export const usePlan = () => {
  const history = useHistory();
  const [planList, setPlanList] = useState<Plan[]>();

  const fetch = () => {
    API.getPlan()
      .then(setPlanList)
      .catch(() => history.replace(ROUTE.LOGIN))
    ;
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
