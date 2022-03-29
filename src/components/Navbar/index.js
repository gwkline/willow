import React from "react";
import { Nav, NavLink, NavMenu, NavTitle } 
    from "./NavbarElements";
import leaf from "../../images/leaf.png";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavTitle>
          <img src={leaf} alt="img" height={45} width={45}></img>
          <h1>Willow</h1>
        </NavTitle>
        <NavMenu>
          <NavLink to="/index">
            Home
          </NavLink>
          <NavLink to="/createproject">
            Create Project
          </NavLink>
          <NavLink to="/projects">
            Dashboard
          </NavLink>
          <NavLink to="/settings">
            Settings
          </NavLink>
          <NavLink to="/login">
            Login
          </NavLink>
          <NavLink to="/register">
            Register
          </NavLink>
          <NavLink to="/reset">
            Reset
          </NavLink>
       
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;