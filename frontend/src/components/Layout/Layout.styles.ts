import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const StyledMain = styled.main`
  flex: 1;
  margin: 0 0 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledHeader = styled.header`
  background-color: black;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
`;

export const StyledAppName = styled.p`
  color: white; 
  margin: 0;
  font-size: 40px;
  font-weight: 800;
`;

export const StyledNav = styled.nav`
  min-width: 150px;
`;

export const StyledNavList = styled.ul`
  display: flex; 
  list-style-type: none;
  justify-content: space-between;
  width: 100%; 
  padding: 0;
`;

export const StyledNavLink = styled(Link)`
  color: white;
  font-size: 16;
  font-weight: 700;
  text-decoration: none;
`