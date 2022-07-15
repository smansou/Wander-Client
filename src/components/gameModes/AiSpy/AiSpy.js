import React, { useState, useEffect } from "react";
import ReactStreetview from "react-google-streetview";
import "./aiSpy.css";
import html2canvas from "html2canvas";
import * as ml5 from "ml5";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import RoundOverSplash from "../../../styled-components/RoundOverSplash/RoundOverSplash";

function AiSpy() {
  const [position, setPosition] = useState({ lat: -33.5344303 , lng: 25.78993 });
  const [objectToFind, setObjectToFind] = useState();
  // const [mapActive, setMapActive] = useState(false);
  const [roundOver, setRoundOver] = useState(false);
  const [capture, setCapture] = useState();
  const [appRef, setAppRef] = useState();
  const navigateTo = useNavigate();
  const {isAuthenticated } = useAuth0();

if (!isAuthenticated) {
    navigateTo("/");
  }
  useEffect(() => {

    async function fetchMaps(){
      try{
      const {data: maps} = await axios.get(`http://127.0.0.1:5000/maps/aispy`);
      const randomIndex = Math.floor(Math.random()*maps.length);
          const {coordinates: {lat, lng}, objectToFind} = maps[randomIndex];
          setPosition({lat: lat, lng: lng})
          setObjectToFind(objectToFind);
      }catch(err){console.log(err);}
    }fetchMaps();
  }, []);
  

  
  const handleRef = (e) => {
    setAppRef(e);
  };
  const handleUserChoice = async () => {
    await captureElement();

  };
  
  
  async function captureElement() {
    const canvas = await html2canvas(appRef);
    setCapture(canvas);
    predict();
  } 

  async function predict() {
    if (!capture) return;
    try {
      // const classifier = await ml5.imageClassifier("MobileNet");
      const classifier = await ml5.objectDetector('CocoSsd');
      // setModel(classifier);
      const results = await classifier.detect(capture);
      console.log(results);
      // const results = await classifier.predict(imgRef.current);
      if(results.length === 0) return console.log('AI Could Not Detect The Object');
      if(results[0].label === 'elephant') setRoundOver(true);
    
    } catch (err){
      {console.log(err)}
  }
}
  

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
      {roundOver && <RoundOverSplash />}
      <div  ref={handleRef} className="game-wrapper">
   <button onClick={handleUserChoice} style={{position:"absolute", height: '40px', zIndex: '9'}}>predict</button>
        <ReactStreetview
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
      </div>
    </>
  );
}

export default AiSpy;
