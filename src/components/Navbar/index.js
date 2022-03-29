import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../Login/firebase";
import { Nav, NavLink, NavMenu } 
    from "./NavbarElements";
  
  
const Navbar = () => {
  const [user] = useAuthState(auth);
  if (user) {
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
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>
            <NavLink to="/Account">
              Account
            </NavLink>
          </NavMenu>
        </Nav>
      </>
    );
  }
  else {
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
  }
};
  
export default Navbar;