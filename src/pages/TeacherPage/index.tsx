import { useHistory } from "react-router-dom";
import { useEffect, useState, FormEventHandler as FEH } from "react";
import * as API from "api";
import { ROUTE } from "route";
import * as Comp from "components";
import * as Type from "domain/type/res/teacher";

import style from './style.module.css';

export const TeacherPage = () => {
  const history = useHistory();
  const [isChange, setIsChange] = useState(false);
  const [teacher, setTeacher] = useState<Type.Detail>();
  const [isShowModal, setIsShowModal] = useState(false);

  const getTeacher = () => {
    API.getTeacherInfo()
      .then(setTeacher)
      .catch(() => history.replace(ROUTE.LOGIN));
  };

  const changePassword: FEH<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    API.updatePassword({
      oldPassword: formData.get("oldPassword")?.toString(),
      newPassword: formData.get("newPassword")?.toString(),
    });

    setIsChange(false);
    setIsShowModal(true);
  };

  useEffect(() => {
    getTeacher();
  }, []);

  console.log("teacher", teacher);

  return (
    <div className={style.TeacherPage}>
      <Comp.Header />
      <div className={style.img} />
      {
        teacher &&
        <div  className={style.data}>
          <div className={style.title}>{teacher.id}</div>
          <div className={style.title}>{teacher.name}</div>
          <div className={style.title}>{teacher.email}</div>
          <button onClick={setIsChange.bind(null, true)}>更改密碼</button>
        </div>
      }
      {
        isChange &&
        <form className={style.change} onSubmit={changePassword}>
          <input name="oldPassword" type="password" placeholder="請輸入舊密碼" />
          <input name="newPassword" type="password" placeholder="請輸入新密碼" />
          <input type="password" placeholder="請再次輸入新密碼" />
          <button>確認</button>
        </form>
      }
      {isShowModal &&
          <Comp.Modal>
            <div>修改成功</div>
            <button onClick={setIsShowModal.bind(null, false)}>確認</button>
          </Comp.Modal>
      }
    </div>
  );
};
