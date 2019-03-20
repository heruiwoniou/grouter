import React, { createElement, Suspense, lazy } from "react";
import { Router, Redirect } from "@reach/router";
import { hot } from "react-hot-loader";

import ErrorBoundary from "./common/utils/ErrorBoundary";

// --------------- /Alert.js---------------
const Page10000 = lazy(() => import("./pages/Alert.js"));
const Page10001 = lazy(() => import("./pages/Alert/index.js"));
const Page10002 = lazy(() => import("./pages/Alert/SDT.js"));
const Page10003 = lazy(() => import("./pages/Alert/_alertId/index.js"));
// --------------- /Dashboard.js---------------
const Page10004 = lazy(() => import("./pages/Dashboard.js"));
const Page10005 = lazy(() => import("./pages/Dashboard/index.js"));

const PageRoot = lazy(() => import("./pages/index.js"));

class RouterRoot extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading</div>}>
          <Router>
            <PageRoot path="/">
              <Page10000 path="/Alert">
                <Page10001 path="/" />
                <Page10002 path="SDT" />
                <Page10003 path=":alertId" />
              </Page10000>
              <Page10004 path="/Dashboard">
                <Page10005 path="/" />
              </Page10004>
            </PageRoot>
          </Router>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(RouterRoot);
