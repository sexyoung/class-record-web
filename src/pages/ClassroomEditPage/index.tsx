import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as API from "api";
import { ROUTE } from "route";
import { fetchApi } from "utils";
import { Header } from "components/Header";
import * as Type from "domain/type/res/classroom";

export const ClassroomEditPage: FC = () => {
  const { id } = useParams<{id: string}>();
  useEffect(() => {
    fetchApi(API.getClassRoom(+id))
      .then(console.log);
  });
  return (
    <div>
      <Header />
      點名記錄修改頁
    </div>
  );
};
