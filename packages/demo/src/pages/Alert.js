import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

export default ({ children }) => (
  <div>
    <h2>Alert Page</h2>
    <ul>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(key => (
        <li key={key}>
          {key} 12-11-2018 (06:38) US-W2:AWS-2012n IIS CPU <Link to={`${key.toString()}/Detail`} >
            View
          </Link> <Link to={`${key.toString()}/Manage`} >
            Detail
          </Link>
        </li>
      ))}
    </ul>
    {children}
  </div>
);

const StyledTabs = styled.ul`
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: row;
`;
