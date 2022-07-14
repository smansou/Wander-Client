import React, { useState, useEffect, useRef, useContext } from "react";
import ReactStreetview from "react-google-streetview";
import GoogleStreetView from "react-google-streetview";
import SmallMap from "../../SmallMap/SmallMap";
import "./guessLocation.css";
import distanceBetweenTwoCoordinates from "../../../utilities/calc";
import axios from "axios";
import {GlobalContext} from "../../providers/GlobalState";
import RoundOverSplash from "../../../styled-components/RoundOverSplash/RoundOverSplash";


function GuessLocation() {
  const {userState} = useContext(GlobalContext);
  const [mapActive, setMapActive] = useState(false);
  const [position, setPosition] = useState({ lat: 40.672401, lng: -73.993524 });
  const [roundOver, setRoundOver] = useState(false);


  async function checkAnswer(lat, lng){
    let distance = distanceBetweenTwoCoordinates(lat, lng, position.lat, position.lng);
   let score = 1000 - (distance*200)/500;
   await axios.patch(
    "http://127.0.0.1:5000/users/inc-games-played",
    { email: userState.userEmail }
  );
   await axios.patch(
    "http://127.0.0.1:5000/users/update-score",
    { email: userState.userEmail, score: score }
  );
  setRoundOver(true); // show round over div with info about round
  }


  useEffect(() => {
    const t = setTimeout(() => {
      setMapActive(true);
    }, 100);
    return () => clearTimeout(t);
  }, []);
  


  
  
  

  const streetViewPanoramaOptions = {
    position: position,
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
    addressControl: false,
    showRoadLabels: false,
    zoomControl: false,
    fullscreenControl: false,
  };

  return (
    <>
      <div className="game-wrapper">
      { roundOver && <RoundOverSplash /> }
        <ReactStreetview
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />

      </div>
      {mapActive &&  <SmallMap getAnswer={checkAnswer} />}
    </>
  );
}

export default GuessLocation;
