<%

function mktab(tab, count) {
  return new Array(count).fill(tab).reduce((t, n) => t + n, "");
}

function walk(data, handle, deep = 0) {
  let l = data.length;
  for(var i = 0; i < l; i++) {
    let item = data[i];
    let hasChild = item.children && item.children.length > 0;
    handle(item, deep);
    hasChild && walk(item.children, handle, deep + 1);
  }
}



%>
import React, { createElement, Suspense, lazy } from "react";
import { Router, Redirect } from "@reach/router";
import { hot } from "react-hot-loader";

import ErrorBoundary from "./common/utils/ErrorBoundary";

<%
let componentNameCount = 10000;
walk(routes, function(orignialRoute, deep) {
  if(orignialRoute.name == "index") {
%>
const PageRoot = lazy(() => import("./pages<%=orignialRoute.component%>"));
<%
  } else {
    if(deep == 0) {
%>// --------------- <%=orignialRoute.component%>---------------
<%
    };
%>const Page<%=componentNameCount++%> = lazy(() => import("./pages<%=orignialRoute.component%>"));
<%
  }
});
%>

class RouterRoot extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading</div>}>
          <Router>
            <PageRoot path="/">
              <%
                let routeCount = 10000;
                let deepArray = [];
                let tab = "  ";
                walk(routes.filter(({ name }) => name != 'index'), function({ children = [], path }, deep) {
                  path = path == "" ? "/" : path;
                  if(deepArray.length != 0 && deepArray[deepArray.length - 1][0] == deep) {
                    let [, closeTag] = deepArray.pop();
              %><%=mktab(tab, deep)%></<%=closeTag%>>
              <%
                  }

                  let hasChild = children.length > 0;
                  let componentName = "Page" + (routeCount++);
                  if (hasChild) {
                    deepArray.push([deep, componentName]);
              %><%=mktab(tab, deep)%><<%=componentName%> path="<%=path%>">
              <%
                  } else {
              %><%=mktab(tab, deep)%><<%=componentName%> path="<%=path%>" />
              <%
                  }
                });
                deepArray.forEach(([deep, closeTag]) => {
              %><%=mktab(tab, deep)%></<%=closeTag%>>
              <%
                })
              %>
            </PageRoot>
          </Router>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default hot(module)(RouterRoot);
