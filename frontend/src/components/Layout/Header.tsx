import { StyledAppName, StyledHeader, StyledNav, StyledNavLink, StyledNavList, } from "./Layout.styles"

export const Header = () => {
  return (
    <StyledHeader>
      <StyledAppName>HRnet</StyledAppName>
      <StyledNav>
        <StyledNavList>
          <li><StyledNavLink to='/' >Home</StyledNavLink></li>
          <li><StyledNavLink to='/employee-list' >Employees</StyledNavLink></li>
        </StyledNavList>
      </StyledNav>
    </StyledHeader>
  )
}