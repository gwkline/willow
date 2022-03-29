import React from "react";
import { Nav, NavLink, NavMenu, NavTitle } 
    from "./NavbarElements";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Login/firebase"
import leaf from "../../images/leaf.png";
  
const Navbar = () => {
  const [user] = useAuthState(auth);
  if (user) {
    return (
      <>
        <Nav>
          <NavTitle>
            <img src={leaf} alt="img" height={45} width={45}></img>
            <h1>Willow</h1>
          </NavTitle>
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
          <NavTitle>
            <img src={leaf} alt="img" height={45} width={45}></img>
            <h1>Willow</h1>
          </NavTitle>
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