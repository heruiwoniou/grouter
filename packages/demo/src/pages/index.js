import React from "react";
import { Link } from "@reach/router";

export default ({ children }) => (
  <div>
    <h1>Hello word</h1>
    <ul>
      <li>
				<Link to="/Alert">alert</Link>
			</li>
      <li>
				<Link to="/Dashboard">dashboard</Link>
			</li>
    </ul>
    <div className="content">{children}</div>
  </div>
);
