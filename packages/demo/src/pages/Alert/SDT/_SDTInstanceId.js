import React from "react";

export default ({ SDTInstanceId, children }) => (
  <div>
    <h3>Alert SDT Instance {SDTInstanceId} Manager Page</h3>
    <div className="alert-sdt-instance-content">{children}</div>
  </div>
);
