import React from "react";
import { Link } from "@reach/router";

export default ({ children }) => (
  <div>
    <h1>Alert Page</h1>
    <Link to="SDT">SDT Manager</Link>
    <div className="alert-content">{children}</div>
  </div>
);
