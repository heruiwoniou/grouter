import React from "react";
import { Link } from "@reach/router";

export default ({ children }) => (
  <div>
    <h3>Alert SDT Instance list Manager Page</h3>
    <ul>
      {["1", "2", "3"].map(id => (
        <li key={id}>
          <Link to={id}>SDT Instance 1</Link>
        </li>
      ))}
    </ul>
    <div className="alert-sdt-list-content">{children}</div>
  </div>
);
