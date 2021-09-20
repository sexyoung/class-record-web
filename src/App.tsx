import {
  Route,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import { ROUTE } from "route";
import * as Page from "pages";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTE.LOGIN}><Page.LoginPage /></Route>
        <Route exact path={ROUTE.SIGNUP}><Page.SignUpPage /></Route>
        <Route exact path={ROUTE.AUTH}><Page.AuthenticationpPage /></Route>
        <Route exact path={ROUTE.CLASS}><Page.ClassroomPage /></Route>
        <Route exact path={ROUTE.HOME}><Page.HomePage /></Route>
      </Switch>
    </Router>
  );
}

export default App;
