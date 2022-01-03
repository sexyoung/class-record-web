import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ROUTE } from "route";
import { PrivateRoute, ProvideAuth } from "./routes";
import * as Page from "pages";
import style from './App.module.css';

function App() {
  return (
    <ProvideAuth>
      <div className={style.App}>
        <div className={style.container}>
          <Router>
            <Switch>
              {/* 登入後頁面 */}
              <PrivateRoute path={ROUTE.ROLLCALL}><Page.RollCallPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.CLASS_EDIT}><Page.ClassroomEditPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.CLASS}><Page.ClassroomPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.STUDENT}><Page.StudentPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.STUDENTPERSONAL}><Page.StudentPersonalPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.PLAN}><Page.PlanPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.AUTH}><Page.AuthenticationPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.PASSWD}><Page.PasswdPage /></PrivateRoute>
              <PrivateRoute path={ROUTE.IMPORT}><Page.ImportPage /></PrivateRoute>

              {/* 登入前頁面 */}
              <Route exact path={ROUTE.LOGIN}><Page.LoginPage /></Route>
              <Route exact path={ROUTE.SIGNUP}><Page.SignUpPage /></Route>
              <Route exact path={ROUTE.HOME}><Page.HomePage /></Route>
            </Switch>
          </Router>
        </div>
        <div className={style.footer}>
          © 2021 RoRoCall. 版權所有。
        </div>
      </div>
    </ProvideAuth>
  );
}

export default App;
