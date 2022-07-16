import React, { useState, useRef, useEffect } from "react";
// import "../Homepage/homepage.css";
import "../LandingPage/landingPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import GlobeGl from "../Globe/GlobeGl";
import LandingCard from "../../styled-components/landing-card/LandingCard";
import earth3d from "../../assets/images/pngwing.png";
import objDetPic from "../../assets/images/object-detection.png";
import SmallMap from "../SmallMap/SmallMap";
import Footer from ".././Footer/Footer";
import logo from "../../assets/images/logo1.png";
import {useInViewport} from 'react-in-viewport';

export default function LandingPage() {
  const anchorRef = useRef();
  const { inViewport } = useInViewport( anchorRef );
  const { loginWithRedirect, isAuthenticated, isLoading, signUp } =
    useAuth0();
    const navigateTo = useNavigate();
    
    if (isAuthenticated) {
      navigateTo("/home");
    }

    
    return isLoading ?  <div>Spinner</div> : (
      <>
     
      <div className="landing-container">
        <nav style={inViewport ? {position: 'fixed'} : {position: 'absolute'} } className="landing-navbar">
          <div className="logo-container">
          <img style={inViewport ? {display: 'block'} : {display: 'none'}} className="logo fadeIn" src={logo} alt="logo" />
          </div>
          <div onClick={() => loginWithRedirect()} className="nav-wrap">
          <div style={{zIndex: 10}}  className="sign-in-link text-white">Already have an account? Log In</div>
          </div>
         
        </nav>
        <div className="landing-page-1">
          <div className="main-header-animation  left-float">
            <h1  className="text-yellow">Wander</h1>
            <h2 className="text-white">Let's Explore The World!</h2>
            
          <button onClick={() => loginWithRedirect()}className="splash-btn login-btn logout-btn">Sign Up</button>
          </div>
          <div className="globe-wrapper">
            <GlobeGl />
          </div>
          
        </div>
        <h4 className="ui horizontal divider header"></h4>
        
        <div className="landing-page-2">
          <div ref={anchorRef} className="landing-cards-container">
          <div className="ui divider mobile-only"></div>
            <LandingCard
              title="title1"
              text={"lorem ipsum text here about game maybe some more info"}
            />
            <div className="ui divider mobile-only"></div>
            <LandingCard
              title="title1"
              imageURL={earth3d}
              text={"lorem ipsum text here about game maybe some more info"}
            />
            <div className="ui divider mobile-only"></div>
            <LandingCard
              title="title1"
              text={"lorem ipsum text here about game maybe some more info"}
              imageURL={objDetPic}
            />
          </div>
        </div>
            <div className="ui divider"></div>
            <Footer />
      </div>
    </>
  );
}
