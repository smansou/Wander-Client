import React from "react";
import "./navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/images/logo1.png"


export default function Navbar() {
  const { logout, isAuthenticated, isLoading, user } = useAuth0();
  return (
    <>
      <div className="navbar-container">
<div className="logo-container">
          <img className="logo" src={logo} alt="logo" />
          </div>
        <div>
          <img className="ui avatar image" src={user.picture} />
          <button style={{height: '40px', background: 'transparent'}} className="logout-btn splash-btn login-btn" onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
      </div>

    </>
  );
}


