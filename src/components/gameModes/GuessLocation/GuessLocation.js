import React, { useState, useEffect, useRef, useContext } from "react";
import SmallMap from "../../SmallMap/SmallMap";
import "./guessLocation.css";
import distanceBetweenTwoCoordinates from "../../../utilities/calc";
import axios from "axios";
import { GlobalContext } from "../../providers/GlobalState";
import RoundOverSplash from "../../../styled-components/RoundOverSplash/RoundOverSplash";
import Streetview from "../../Streetview/Streetview";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import Statnav from "../../../styled-components/stat-navbar/Statnav";
import SplashMap from "../../SplashMap/SplashMap"



function GuessLocation() {
  const { userState } = useContext(GlobalContext);
  const [mapActive, setMapActive] = useState(false);
  const [streetviewActive, setStreetviewActive] = useState(false);
  const [position, setPosition] = useState({ lat: 40.672401, lng: -73.993524 });
  const [roundOver, setRoundOver] = useState(false);
  const [distance, setDistance] = useState();
  const navigateTo = useNavigate();
  const {mode} = useParams();
  const {isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    navigateTo("/");
  }
  
  useEffect(() => {
    async function fetchMaps(){
      try{
      const {data: maps} = await axios.get(`http://127.0.0.1:5000/maps/${mode}`);
      const randomIndex = Math.floor(Math.random()*maps.length);
          const {coordinates: {lat, lng}} = maps[randomIndex];
          setPosition({lat: lat, lng: lng})
      }catch(err){console.log(err);}
    }fetchMaps();

    const t = setTimeout(() => {
      setMapActive(true);
    }, 200);
    return () => clearTimeout(t);
  }, []);


  async function checkAnswer(lat, lng) {
    let distance = distanceBetweenTwoCoordinates(
      lat,
      lng,
      position.lat,
      position.lng
    );
    setDistance(distance)

    let score = 1000 - (distance * 200) / 500;
    try{
      await axios.patch("http://127.0.0.1:5000/users/inc-games-played", {
      email: userState.userEmail,
    });
    await axios.patch("http://127.0.0.1:5000/users/update-score", {
      email: userState.userEmail,
      score: score,
    });
  }catch(err){
    console.log("failed to update score");
  }
    
    setRoundOver(true); // show round over div with info about round
  }






  return (
    <>
        <Statnav />
      <div className="game-wrapper">
        {roundOver && <RoundOverSplash  title={`Well Done! You were ${Math.floor(distance)} KM away`}  middle={<SplashMap  position={position} />} />}
          <Streetview position={position} />
      
      </div>
      {mapActive && <SmallMap getAnswer={checkAnswer} />}
    </>
  );
}

export default GuessLocation;
