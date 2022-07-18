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
import Spinner from "../../../styled-components/Spinner/Spinner";



function GuessLocation() {
  const { userState } = useContext(GlobalContext);
  const [mapActive, setMapActive] = useState(false);
  const [streetviewActive, setStreetviewActive] = useState(false);
  const [position, setPosition] = useState();
  const [score, setScore] = useState();
  const [roundOver, setRoundOver] = useState(false);
  const [distance, setDistance] = useState();
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  const {mode} = useParams();
  const {isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    navigateTo("/");
  }
  
useEffect(()=>{
  fetchMaps();

},[])
  
    const t = setTimeout(() => {
      setMapActive(true);
    }, 600);



  async function fetchMaps(){
    try{
    const {data: maps} = await axios.get(`https://wander-earth.herokuapp.com/maps/${mode}`);
    const randomIndex = Math.floor(Math.random()*maps.length);
        const {coordinates: {lat, lng}} = maps[randomIndex];
        setPosition({lat: lat, lng: lng})
        setLoading(false);
    }catch(err){console.log(err);}
  }
  
  async function checkAnswer(lat, lng) {
    setLoading(true);
    let distance = distanceBetweenTwoCoordinates(
      lat,
      lng,
      position.lat,
      position.lng
    );
    setDistance(distance)
      let roundScore = distance > 1000 ? 300+(Math.random()*200) : (2000-distance)+ Math.random()*100;
    setScore(Math.ceil(roundScore));
    try{
      await axios.patch("https://wander-earth.herokuapp.com/users/inc-games-played", {
      email: userState.userEmail,
    });
    await axios.patch("https://wander-earth.herokuapp.com/users/update-score", {
      email: userState.userEmail,
      score: score,
    });
   
    

  }catch(err){
    console.log("failed to update score", err);
  }
    setRoundOver(true);
    setLoading(false);
  }






  return (
    <>
    {loading && <Spinner />}
      <div className="game-wrapper">
        {roundOver && <RoundOverSplash 
        text1={'Continue'}  
        callback1={()=>{fetchMaps(); setRoundOver(false)}} 
         title={`You were ${Math.floor(distance)} KM away!`} 
         lower={'Score:  ' + Math.ceil(score)}
          middle={<SplashMap   position={position} />} 
          />}
          <Streetview email={userState.userEmail} position={position} />
      
      </div>
      {!roundOver && (mapActive && <SmallMap refresh={loading} getAnswer={checkAnswer} />)}
    </>
  );
}

export default GuessLocation;
