import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";

export default ({ children }) => (
  <StyledWrapper>
    <StyledMenu>
      <ul>
        <li>
          <Link getProps={({ isCurrent, isPartiallyCurrent }) => isCurrent || isPartiallyCurrent ? {style:{color: "red"}} : {}} to="Logs">Logs</Link>
        </li>
        <li>
          <Link getProps={({ isCurrent, isPartiallyCurrent }) => isCurrent || isPartiallyCurrent ? {style:{color: "red"}} : {}} to="Collectors">Collectors</Link>
        </li>
        <li>
          <Link getProps={({ isCurrent, isPartiallyCurrent }) => isCurrent || isPartiallyCurrent ? {style:{color: "red"}} : {}} to="Users">Users</Link>
        </li>
      </ul>
    </StyledMenu>
    <StyledContent>
      <h2>Settings Page</h2>
      {children}
    </StyledContent>
  </StyledWrapper>
);

const StyledMenu = styled.div`
  width: 200px;
`;
const StyledContent = styled.div`
  padding: 10px;
`;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
