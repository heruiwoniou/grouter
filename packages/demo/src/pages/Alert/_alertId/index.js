import React from "react";

export default ({ children, alertId }) => (
  <div>
    <h2>Alert Instance {alertId}</h2>
    <div className="alert-instance-content">{children}</div>
  </div>
);
