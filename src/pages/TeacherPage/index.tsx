import { useHistory } from "react-router-dom";
import { useEffect, useState, FormEventHandler as FEH } from "react";
import * as API from "api";
import { ROUTE } from "route";
import * as Comp from "components";
import * as Type from "domain/type/res/teacher";

import cx from 'classnames';
import style from './style.module.css';
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

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
      <div className={style.container}>
        <div className={style.title}>更改密碼</div>
        <form className={style.change} onSubmit={changePassword}>
          <input className={cx(inputStyle.input, "mt-5")} name="oldPassword" type="password" placeholder="請輸入舊密碼" required/>
          <input className={cx(inputStyle.input, "mt-5")} name="newPassword" type="password" placeholder="請輸入新密碼" required/>
          <input className={cx(inputStyle.input, "mt-5")} type="password" placeholder="請再次輸入新密碼" required/>
          <button className={cx(btnStyle.btn, "w-full mt-8")} >確認</button>
        </form>
        <button className={cx(btnStyle.btn, "w-full mt-5")} onClick={() => history.replace(ROUTE.CLASS)}>取消</button>
        {isShowModal &&
          <Comp.Modal>
            <div className={style.modalContainer}>
              <div className={style.modalText}>修改成功</div>
              <button className={cx(btnStyle.btn, "w-full")} onClick={() => history.replace(ROUTE.CLASS)}>確認</button>
            </div>
          </Comp.Modal>
        }
      </div>
    </div>
  );
};



