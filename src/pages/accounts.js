import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { auth, logout } from "../firebase";
import ProjectList from "../components/Projects/ProjectList";


function Account() {
  
const [loadedProjects ] = useState([]);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/register");
  }, [user, loading, navigate]);

  return (
    <div className="dashboard">
      <div>
      <h1>This is the Account page</h1>

      <h2> Name: {user?.displayName}</h2>
      <h3> Email: {user?.email}</h3>

      <ProjectList projects={loadedProjects} />
    </div>
       <div className="dashboard__container">
        Logged in as
         <div>{user?.displayName}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
};
export default Account;