import cx from 'classnames';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import * as API from "api";
import { ROUTE } from "route";
import * as Comp from "components";

import style from './style.module.css';
import btnStyle from 'components/btn.module.css';
import inputStyle from 'components/input.module.css';

export const PostponePage = () => {
  const history = useHistory();
  const [isShowModal, setIsShowModal] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    API.postpone(+formData.get('day')! || 0);
    setIsShowModal(true);
  };
  return (
    <div className={style.PostponePage}>
      <Comp.Header />
      <div className={style.container}>
        <h1 className={style.title}>老師請假</h1>
        <div className={style.intro}>
          老師請假的天數會將所有學生的有效期限一起延後。
        </div>
        <form onSubmit={handleSubmit}>
          <input className={cx(inputStyle.input, "mt-5")} name="day" type="tel" placeholder="請假天數" required pattern="[0-9]+" />
          <button className={cx(btnStyle.btn, "w-full mt-8")} >確認請假</button>
        </form>
      </div>
      {isShowModal &&
        <Comp.Modal>
          <div className={style.modalContainer}>
            <div className={style.modalText}>請假成功</div>
            <button className={cx(btnStyle.btn, "w-full")} onClick={() => history.replace(ROUTE.CLASS)}>確認</button>
          </div>
        </Comp.Modal>
      }
    </div>
  );
};
