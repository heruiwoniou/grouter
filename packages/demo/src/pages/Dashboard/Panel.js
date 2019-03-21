import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

export default ({ children }) => (
  <div>
    <h2>Dashboard Panel</h2>
    <StyledDashboardPanel>
      {new Array(20).fill(null).map((key,index) => 
      <li key={index}>
        ID: {index}
        <Link to={`${index}`}>Expand</Link>
      </li>)}
    </StyledDashboardPanel>
    {children}
  </div>
);

const StyledDashboardPanel = styled.ul`
  margin: 0;
  padding: 0;
  overflow;
  li {
    list-style: none;
    height: 50px;
    width: 100px;
    margin: 5px 0 0 5px;
    background: #ccc;
    float:left;
  }
`;