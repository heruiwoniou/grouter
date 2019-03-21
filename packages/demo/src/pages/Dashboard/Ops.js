import React from "react";

export default ({ children }) => (
  <div>
    <h2>Ops Notes List</h2>
		<ul>
			{[1,2,3,4,5,6,7,8].map(key=><li key={key}>{key} Ops Note item</li>)}
		</ul>
    <div className="dashboard-content">{children}</div>
  </div>
);
