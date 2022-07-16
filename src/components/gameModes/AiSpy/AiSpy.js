import React, { useState, useEffect, useContext } from "react";
import ReactStreetview from "react-google-streetview";
import "./aiSpy.css";
import html2canvas from "html2canvas";
import * as ml5 from "ml5";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import RoundOverSplash from "../../../styled-components/RoundOverSplash/RoundOverSplash";
import { GlobalContext } from "../../providers/GlobalState";



function AiSpy() {
  const [position, setPosition] = useState({ lat: -33.5344303, lng: 25.78993 });
  const [objectToFind, setObjectToFind] = useState();
  const [roundOver, setRoundOver] = useState(false);
  const [result, setResult] = useState(false);
  const [capture, setCapture] = useState();
  const [appRef, setAppRef] = useState();
  const [won, setWon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();
  const { isAuthenticated } = useAuth0();
  const { userState } = useContext(GlobalContext);

  if (!isAuthenticated) {
    navigateTo("/");
  }
  async function fetchMaps() {
    setRoundOver(false)
    try {
      const { data: maps } = await axios.get(
        `https://wander-earth.herokuapp.com/maps/aispy`
      );
      const randomIndex = Math.floor(Math.random() * maps.length);
      const {
        coordinates: { lat, lng },
        objectToFind,
      } = maps[randomIndex];
      setPosition({ lat: lat, lng: lng });
      setObjectToFind(objectToFind);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    
    fetchMaps();
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
    setIsLoading(true);
    try {
      // const classifier = await ml5.imageClassifier("MobileNet");
      const classifier = await ml5.objectDetector("CocoSsd");
      // setModel(classifier);
      const results = await classifier.detect(capture);
      console.log(results);
      if (results.length > 0) setResult(results[0].label);
      setIsLoading(false);
      setRoundOver(true);
      // const results = await classifier.predict(imgRef.current);
      await axios.patch("https://wander-earth.herokuapp.com/users/inc-games-played", {
      email: userState.userEmail,
    });
    await axios.patch("https://wander-earth.herokuapp.com/users/update-score", {
      email: userState.userEmail,
      score: 200,
    });
      if (result === objectToFind) setWon(true);
    } catch (err) {
      {
        console.log(err);
      }
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
      {isLoading && <div>Detecting...</div>}
      {roundOver && <RoundOverSplash callback1={fetchMaps} callback2={()=>{setRoundOver(false)}} text2={!won?"Adjust angle and retry" : ''} text1={'Continue'} title={won ? "Well Done!" : "No Detections"} />}
      <div ref={handleRef} className="game-wrapper">
        <button
          className="splash-btn"
          disabled={isLoading}
          onClick={handleUserChoice}
          style={{ position: "absolute", right: "10px", zIndex: "9" }}
        >
          predict
        </button>
        <ReactStreetview
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
      </div>
    </>
  );
}

export default AiSpy;
