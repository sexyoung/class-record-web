import { FC, FormEventHandler as FEH } from "react";
import { useHistory } from "react-router";
import { ROUTE } from "route";
import * as API from "api";
import { fetchApi } from "utils";

export const AuthenticationPage: FC = () => {
  const history = useHistory();

  const auth: FEH<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    fetchApi(API.getAuth(formData.get("code") as string)).then((json) => {
      if (json.message === 'TOKEN_INVALID') {
        return window.alert(json.message);
      }
      history.replace(ROUTE.CLASS);
    });
  };

  return (
    <div>
      <div>認證頁</div>
      <form onSubmit={auth}>
        <input type="text" name="code" placeholder="四位驗證碼" required />
        <button>驗證</button>
        {/* 沒token導到登入頁 */}
      </form>
    </div>
  );
};
