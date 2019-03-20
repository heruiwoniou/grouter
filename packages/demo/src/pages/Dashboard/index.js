import React from "react";

export default ({ children }) => (
  <div>
    <h2>Default empty Dashboard Page</h2>
    <div className="dashboard-content">{children}</div>
  </div>
);
