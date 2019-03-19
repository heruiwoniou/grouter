import React from "react";
import b from './b';

export default ({ children }) => (
  <div>
    <h2>Alert Page {b}</h2>
    <div className="alert-content">{children}</div>
  </div>
);
