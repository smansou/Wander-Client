import React, {useRef, useContext } from "react";
import "./homepage.css";
import GlobeGl from "../Globe/GlobeGl";
import AnimatedCard from "../../styled-components/animatedCard/AnimatedCard";
import Navbar from "../Navbar/Navbar";
import StatCard from "../../styled-components/StatCard/StatCard";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../providers/GlobalState";
import nyPic from "../.././assets/images/new-york.jpeg";
import icyLandscape from "../.././assets/images/ice-landscape.jpeg";
import parisPic from "../.././assets/images/paris.webp";
import sydneyPic from "../.././assets/images/sydney.jpeg";
import tropicsPic from "../.././assets/images/extreme-places-2.jpeg";
import Footer from "../Footer/Footer";
import Banner from "../../styled-components/banner/Banner";
import {useInViewport} from 'react-in-viewport';
import logo from "../../assets/images/logo1.png";
import Spinner from "../../styled-components/Spinner/Spinner";


export default function Homepage() {
  const {isAuthenticated, isLoading, logout, user } = useAuth0();
    const anchorRef = useRef();
  const navigateTo = useNavigate();
  const globalState = useContext(GlobalContext);
  const { userState, setUserState } = globalState;
  const { inViewport } = useInViewport( anchorRef );
  if (!isAuthenticated) {
    navigateTo("/");
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="home-container">
      <nav style={inViewport ? {position: 'fixed', background:'rgb(0,0,0,0.3' } : {position: 'absolute'} } className="landing-navbar">
          <div className="logo-container">
          <img onClick={()=>navigateTo('/home')}  style={inViewport ? {display: 'block', zIndex:'15' } : {display: 'none'}} className="logo fadeIn" src={logo} alt="logo" />
          </div>
          <div>
          <img className="ui avatar image" src={user.picture} />
          <button  className="logout-btn splash-btn login-btn" onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
          </button>
          </div>
        </nav>
      <div className="home-page-1">
        <div className="left-float animateIn">
          <h1 className="text-yellow">Wander</h1>

          
          
          <h2 id="white">Teleport And Explore!</h2>
        </div>
        <div className="globe-wrapper-homepage">
          <GlobeGl />
           </div>
        
      </div>
      {/* <div className="ui divider"></div> */}
      <div className="page-2">
        <div  className="stat-container">
          <StatCard statNumber={userState.userLevel} statTitle={"Level"} />
          <StatCard
            statNumber={userState.userGamesPlayed}
            statTitle={"Games Played"}
          />
          <StatCard
            statNumber={`${userState.userDistance.toPrecision(3) } km`}
            statTitle={"Distance Travelled"}
          />
        </div>
        <div  className="ui inverted horizontal divider">Classic</div>
        <div ref={anchorRef} className="cards-container">
        <Link to={"/guesslocation/world"}>
          <AnimatedCard
            roundImage={nyPic}
            primaryText="WORLD"
            secondaryText="Spawn in a random location, guess where you are!"
            innerText="even more info"
            bgImage="https://c1.staticflickr.com/4/3935/32253842574_d3d449ab86_c.jpg"
            animationName='animateRight'
          />
          </Link>
          
          <Link to={"/guesslocation/capitals"}>
            <AnimatedCard
            roundImage={parisPic}
            primaryText="CAPITALS"
            secondaryText="Spawn in a world capital, guess where you are!"
            innerText="even more info"
            bgImage={sydneyPic}
            animationName='animateUp'
          />
          </Link>
          
          <Link to={"/guesslocation/extreme"}>
          <AnimatedCard
            roundImage={icyLandscape}
            primaryText="EXTREME LOCATIONS"
            secondaryText="Can you withstand the harshness of these destinations?"
            innerText="even more info"
            bgImage={tropicsPic}
            animationName='animateLeft'
          />
          </Link>
          
        </div>

        <div className="ui inverted horizontal divider">AI-Spy</div>
        <Link to='/aispy'>
        <div className="banner-wrapper">
          <Banner />
        </div>
        </Link>
      </div>

      <div className="footer-container">
      <div className="ui divider"></div>
      <Footer />
      </div>
     
    </div>
  );
}

     