import React from "react";
import { Link } from "@reach/router";

export default ({ children }) => (
  <div>
    <h1>Dashboard Page</h1>
    <Link
      getProps={({ isCurrent }) => (isCurrent ? { style: { color: "red" } } : {})}
      to=""
    >
      Dashboard
    </Link>{" "}
    <Link
      getProps={({ isCurrent }) => (isCurrent ? { style: { color: "red" } } : {})}
      to="Ops"
    >
      Ops Notes
    </Link>
    <div className="dashboard-content">{children}</div>
  </div>
);
