
import React, { createElement, Suspense, lazy } from "react";
import { Router, Redirect } from "@reach/router";
import { hot } from "react-hot-loader";

import ErrorBoundary from "./common/utils/ErrorBoundary";

// --------------- /Alert.js---------------
const Page10000 = lazy(() => import("./pages/Alert.js"));
const Page10001 = lazy(() => import("./pages/Alert/_id/Detail.js"));
const Page10002 = lazy(() => import("./pages/Alert/_id/Manage.js"));
// --------------- /Dashboard.js---------------
const Page10003 = lazy(() => import("./pages/Dashboard.js"));
const Page10004 = lazy(() => import("./pages/Dashboard/index.js"));
const Page10005 = lazy(() => import("./pages/Dashboard/Ops.js"));
const Page10006 = lazy(() => import("./pages/Dashboard/Panel.js"));
const Page10007 = lazy(() => import("./pages/Dashboard/Panel/_instanceId/_widgetId.js"));
const Page10008 = lazy(() => import("./pages/Dashboard/Panel/_groupId/_instanceId/_widgetId.js"));
// --------------- /Settings.js---------------
const Page10009 = lazy(() => import("./pages/Settings.js"));
const Page10010 = lazy(() => import("./pages/Settings/index.js"));
const Page10011 = lazy(() => import("./pages/Settings/Collectors.js"));
const Page10012 = lazy(() => import("./pages/Settings/Logs.js"));
const Page10013 = lazy(() => import("./pages/Settings/Users.js"));

const PageRoot = lazy(() => import("./pages/index.js"));


class RouterRoot extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading</div>}>
          <Router>
            <PageRoot path="/">
              <Page10000 path="/Alert">
                <Page10001 path=":id/Detail" />
                <Page10002 path=":id/Manage" />
              </Page10000>
              <Page10003 path="/Dashboard">
                <Page10004 path="/" />
                <Page10005 path="Ops" />
                <Page10006 path="Panel">
                  <Page10007 path=":instanceId/:widgetId?" />
                  <Page10008 path=":groupId/:instanceId?/:widgetId?" />
              </Page10006>
              </Page10003>
              <Page10009 path="/Settings">
                <Page10010 path="/" />
                <Page10011 path="Collectors" />
                <Page10012 path="Logs" />
                <Page10013 path="Users" />
              </Page10009>
              
            </PageRoot>
          </Router>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(RouterRoot);
