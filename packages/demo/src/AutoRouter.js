import React, { createElement, Suspense, lazy } from "react";
import { Router, Redirect } from "@reach/router";
import { hot } from "react-hot-loader";

import ErrorBoundary from "./common/utils/ErrorBoundary";

const DefaultPage = lazy(() => import("./pages"));
const AlertPage = lazy(() => import("./pages/Alert.js"));
const AlertInstancePage = lazy(() => import("./pages/Alert/_alertId/index.js"));
const AlertDefaultPage = lazy(() => import("./pages/Alert/index.js"));
const AlertSDTPage = lazy(() => import("./pages/Alert/SDT.js"));

const DashboardPage = lazy(() => import("./pages/Dashboard.js"));
const DashboadDefaultPage = lazy(() => import("./pages/Dashboard/index.js"));

class RouterRoot extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading</div>}>
          <Router>
            <DefaultPage path="/">
              <AlertPage path="/alert">
                <AlertDefaultPage path="/alert/" />
                <AlertInstancePage path="/alert/:alertId" />
                <AlertSDTPage path="/alert/SDT" />
              </AlertPage>
              <DashboardPage path="/dashboard">
                <DashboadDefaultPage path="/dashboard/" />
              </DashboardPage>
            </DefaultPage>
          </Router>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(RouterRoot);
