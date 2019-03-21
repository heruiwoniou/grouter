import React, { memo } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "@reach/router";

export default memo(({ children }) => (
  <>
    <GlobalSyle />
    <NavLeft>
      <ul>
        <li>
          <Link
            getProps={({ isCurrent, isPartiallyCurrent }) => {
              return {
                style: {
                  color: isCurrent || isPartiallyCurrent ? "red" : "#205fff"
                }
              };
            }}
            to="/Dashboard"
          >
            D
          </Link>
        </li>
        <li>
          <Link
            getProps={({ isCurrent, isPartiallyCurrent }) => {
              // the object returned here is passed to the
              // anchor element's props
              return {
                style: {
                  color: isCurrent || isPartiallyCurrent ? "red" : "#205fff"
                }
              };
            }}
            to="/Alert"
          >
            A
          </Link>
        </li>

        <li>
          <Link
            getProps={({ isCurrent, isPartiallyCurrent }) => {
              return {
                style: {
                  color: isCurrent || isPartiallyCurrent ? "red" : "#205fff"
                }
              };
            }}
            to="/Settings"
          >
            S
          </Link>
        </li>
      </ul>
    </NavLeft>
    <ContentRight>
      <StyledHeader />
      <StyledContent>{children}</StyledContent>
    </ContentRight>
  </>
));

const GlobalSyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

const NavLeft = styled.div`
  width: 60px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #205fff;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }

  li {
    margin: 10px;
    list-style: none;
  }

  a {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #d8d8d8;
    color: white;
    font-size: 20px;
    text-align: center;
    display: block;
    line-height: 40px;
    text-decoration: none;
  }
`;

const ContentRight = styled.div`
  height: 100%;
  margin-left: 60px;
`;

const StyledHeader = styled.header`
  height: 50px;
  border-bottom: 2px solid #e6ebf6;
`;

const StyledContent = styled.div`
  padding: 10px;
`;
