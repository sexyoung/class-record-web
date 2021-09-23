import { FC } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ROUTE } from "route";
import * as Page from "pages";
import "./App.css";

export const MainPage: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTE.CLASS}><Page.ClassroomPage /></Route>
        <Route exact path={ROUTE.STUDENT}><Page.StudentPage /></Route>
      </Switch>
    </Router>
  );
};
