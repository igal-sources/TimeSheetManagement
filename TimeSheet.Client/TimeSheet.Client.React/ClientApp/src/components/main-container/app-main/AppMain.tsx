import React from "react";
import { Route, Switch } from "react-router-dom";
import { WorkingHourList } from "../../working-hours-management/working-hour-list/WorkingHourList";
import { ProjectList } from "../../projects-management/project-list/ProjectList";
import { CustomerList } from "../../customers-management/customer-list/CustomerList";
import { NotFoundPage } from "shared/not-found-page/NotFoundPage";
import "./app-main.scss";

export const AppMain = () => {
  return (
    <div className="main-screen-container">
      <Switch>
        <Route exact path="/working-hours-list" component={WorkingHourList} />
        <Route path="/customers-list" component={CustomerList} />
        <Route path="/projects-list" component={ProjectList} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};
