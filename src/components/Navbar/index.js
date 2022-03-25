import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/index">
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
          <NavLink to="/dashboard">
            Dashboard
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