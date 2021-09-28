import { FC, useEffect, useState } from "react";

import * as API from "api";
import { fetchApi } from "utils";
import { Header } from "components/Header";
import * as Type from "domain/type/res/classroom";
import { Link } from "react-router-dom";
import { ROUTE } from "route";

export const ClassroomEditPage: FC = () => {
  
  return (
    <div>
      <Header />
      點名記錄修改頁
    </div>
  );
};
