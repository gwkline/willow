import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/createproject">
            Create Project
          </NavLink>
          <NavLink to="/projects">
            Projects
          </NavLink>
          <NavLink to="/Updates">
            Updates
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
        </NavMenu>
      </Nav>
    </>
  );
};
  
export default Navbar;