import React from "react";
// import "../Homepage/homepage.css";
import "../LandingPage/landingPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import GlobeGl from "../Globe/GlobeGl";
import LandingCard from "../../styled-components/landing-card/LandingCard";
import earth3d from "../../assets/images/pngwing.png";
import SmallMap from "../SmallMap/SmallMap";
import Footer from ".././Footer/Footer"

export default function LandingPage() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
    const navigateTo = useNavigate();
    
    if (isAuthenticated) {
      navigateTo("/home");
    }
    
    return (
      <>
     
      <div className="landing-container">
        <nav className="landing-navbar">
          LOGO
          <button onClick={() => loginWithRedirect()}>Log In</button>
        </nav>
        <div className="landing-page-1">
          <div className="left-float">
            <h1 className="animateIn">Wander</h1>
            <h2 className="animateIn">Let's Explore The World!</h2>
          </div>
          <div className="globe-wrapper">
            {/* <GlobeGl /> */}
          </div>
          
        </div>
        <h4 className="ui horizontal divider header"></h4>
        {/* <svg
          className="seperator-svg"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1920 120"
        >
          <path
            fill-rule="evenodd"
            fill="#fff"
            d="M0,55.9621684 C300.495844,106.578393 620.495844,106.578393 960,55.9621684 C1299.50416,5.34594386 1619.50416,5.34594386 1920,55.9621684 L1920,120 L0,120 L0,55.9621684 Z"
          ></path>
        </svg> */}
        <div className="landing-page-2">
          <div className="landing-cards-container">
            <LandingCard
              title="title1"
              text={"lorem ipsum text here about game maybe some more info"}
            />
            <LandingCard
              title="title1"
              imageURL={earth3d}
              text={"lorem ipsum text here about game maybe some more info"}
            />
            <LandingCard
              title="title1"
              text={"lorem ipsum text here about game maybe some more info"}
            />
            <div className="ui divider"></div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
