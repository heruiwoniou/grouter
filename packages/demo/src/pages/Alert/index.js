import React from "react";
import { Link } from "@reach/router";

export default ({ children }) => (
  <div>
    <h2>Default empty Alert content</h2>
    <ul>
      {["1", "2", "3", "4", "5", "6", "7"].map(id => (
        <li>
          <Link to={id}>Alert Instance {id}</Link>
        </li>
      ))}
    </ul>
    <div className="alert-content">{children}</div>
  </div>
);
