import React from "react";
import "./navbar.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { logout, isAuthenticated, isLoading, user } = useAuth0();
  return (
    <>
      <div className="navbar-container">
        LOGO
        <div>
          <img className="ui avatar image" src={user.picture} />
          <button className="logout-btn" onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
      </div>

    </>
  );
}


