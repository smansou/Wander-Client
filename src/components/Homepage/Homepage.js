import React, { useEffect, useContext, useState } from "react";
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
import RoundOverSplash from "../../styled-components/RoundOverSplash/RoundOverSplash";
export default function Homepage() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const navigateTo = useNavigate();
  const globalState = useContext(GlobalContext);
  const { userState, setUserState } = globalState;
  if (!isAuthenticated) {
    navigateTo("/");
  }

  return isLoading ? (
    <div>Spinner</div>
  ) : (
    <div className="home-container">
      <Navbar />
      <div className="home-page-1">
        <div className="left-float animateIn">
          <h1 className="text-yellow">Wander</h1>
          <h2 id="white">Let's Explore The World!</h2>
        </div>
        <div className="globe-wrapper-homepage">
          {/* <GlobeGl /> */}
           </div>
        
      </div>
      {/* <div className="ui divider"></div> */}
      <div className="page-2">
        <div className="stat-container">
          <StatCard statNumber={userState.userLevel} statTitle={"Level"} />
          <StatCard
            statNumber={userState.userGamesPlayed}
            statTitle={"Games Played"}
          />
          <StatCard
            statNumber={userState.userDistance}
            statTitle={"Distance Travelled"}
          />
        </div>
        <div className="ui inverted horizontal divider">Classic</div>
        <div className="cards-container">
        <Link to={"/guesslocation/world"}>
          <AnimatedCard
            roundImage={nyPic}
            primaryText="WORLD"
            secondaryText="Spawn in a random location, guess where you are!"
            innerText="even more info"
            bgImage="https://c1.staticflickr.com/4/3935/32253842574_d3d449ab86_c.jpg"
          />
          </Link>
          
          <Link to={"/guesslocation/capitals"}>
            <AnimatedCard
            roundImage={parisPic}
            primaryText="CAPITALS"
            secondaryText="Spawn in a world capital, guess where you are!"
            innerText="even more info"
            bgImage={sydneyPic}
          />
          </Link>
          
          <Link to={"/guesslocation/extreme"}>
          <AnimatedCard
            roundImage={icyLandscape}
            primaryText="EXTREME LOCATIONS"
            secondaryText="Can you withstand the harshness of these destinations?"
            innerText="even more info"
            bgImage={tropicsPic}
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
