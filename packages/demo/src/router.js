import React, { createElement, Suspense, lazy } from "react";
import { Router, Redirect } from "@reach/router";
import { hot } from "react-hot-loader";

import ErrorBoundary from "./common/utils/ErrorBoundary";

import Root from "./pages/Root";
const AlertPage = lazy(() => import("./pages/Alert"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

class RouterRoot extends React.Component {
  render() {
    return createElement(
      ErrorBoundary,
      null,
      createElement(
        Suspense,
        {
          fallback: createElement("div", null, "Loading...")
        },
        createElement(
          Router,
          null,
          createElement(
            Root,
            { path: "/" },
            ...[
              createElement(Redirect, { path: "/", from: "/", to: "/alert" }),
              createElement(AlertPage, { path: "alert" }),
              createElement(Dashboard, { path: "dashboard" })
            ]
          )
        )
      )
    );

    // <ErrorBoundary>
    //   <Suspense>
    //     <Router>
    //       <Root path="/">
    //         <Redirect path="/" from="/" to="/alert" />
    //         <AlertPage path="alert" />
    //         <Dashboard path="dashboard" />
    //       </Root>
    //     </Router>
    //   </Suspense>
    // </ErrorBoundary>
  }
}

export default hot(module)(RouterRoot);
