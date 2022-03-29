import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const Nav = styled.nav`
  background: #94A98C;
  height: 85px;
  display: flex;
  justify-content: space-between;
  z-index: 12;
`;
  
export const NavLink = styled(Link)`
  color: #354f52;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  width: 76%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavTitle = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 20px;
  font-size: 20px;
  letter-spacing: .1rem;
`;