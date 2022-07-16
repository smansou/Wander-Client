import React, { useState, useRef, useEffect } from "react";
// import "../Homepage/homepage.css";
import "../LandingPage/landingPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import GlobeGl from "../Globe/GlobeGl";
import LandingCard from "../../styled-components/landing-card/LandingCard";
import earth3d from "../../assets/images/pngwing.png";
import objDetPic from "../../assets/images/objLanding.png";
import SmallMap from "../SmallMap/SmallMap";
import Footer from ".././Footer/Footer";
import logo from "../../assets/images/logo1.png";
import {useInViewport} from 'react-in-viewport';
import { SpinnerDotted } from 'spinners-react';
import Spinner from "../../styled-components/Spinner/Spinner";


export default function LandingPage() {
  const anchorRef = useRef();
  const { inViewport } = useInViewport( anchorRef );
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    const navigateTo = useNavigate();
    
    if (isAuthenticated) {
      navigateTo("/home");
    }
   
    
    return isLoading ? <Spinner />
    : (
      <>
      <div className="landing-container">
        <nav style={inViewport ? {position: 'fixed'} : {position: 'absolute'} } className="landing-navbar">
          <div className="logo-container">
          <img onClick={()=>navigateTo('/home')} style={inViewport ? {display: 'block'} : {display: 'none'}} className="logo fadeIn" src={logo} alt="logo" />
          </div>
          <div onClick={() => loginWithRedirect()} className="nav-wrap">
          <div style={{zIndex: 10}}  className="sign-in-link text-white">Already have an account? <span className="text-yellow">Log In</span> </div>
          </div>
         
        </nav>
        <div className="landing-page-1">
          <div className="main-header-animation  left-float">
            <h1  className="text-yellow">Wander</h1>
            <h2 className="text-white">Teleport and explore!</h2>
            
          <button onClick={() => loginWithRedirect()}className="splash-btn login-btn logout-btn">Sign Up</button>
          </div>
          <div className="globe-wrapper">
            <GlobeGl />
          </div>
          
        </div>
        
        <div className="landing-page-2">
          <div ref={anchorRef} className="landing-cards-container">
          <div className="ui divider mobile-only"></div>
          <LandingCard
            title="Explore the Globe..."
            imageURL={earth3d}
            text={"Spawn in breathtaking destinations and guess where you are!"}
          />
            <div className="ui divider mobile-only"></div>
            <div className="ui divider mobile-only"></div>
            <LandingCard
              title="AI-Spy with my little eye..."
              text={"Find hidden objects and gems and test our Machine-Learning powered model"}
              imageURL={objDetPic}
            />
            <LandingCard
              title="Limitless play"
              text={"The game is free and always will be!"}
            />
          </div>
        </div>
        <div className="divider-padding"><div className="ui divider"></div></div>
            
            <Footer />
      </div>
    </>
  );
}
