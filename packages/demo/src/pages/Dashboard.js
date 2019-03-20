import React from "react";

export default ({ children }) => (
  <div>
    <h1>Dashboard Page</h1>
    <div className="dashboard-content">{children}</div>
  </div>
);
