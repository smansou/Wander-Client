import React, { useState, useEffect, useRef } from "react";
import ReactStreetview from "react-google-streetview";
import SmallMap from "../../SmallMap/SmallMap";
import "./aiSpy.css";
import distanceBetweenTwoCoordinates from "../../../utilities/calc";
import html2canvas from "html2canvas";
import * as ml5 from "ml5";

function AiSpy() {
  const [mapActive, setMapActive] = useState(false);
  const [position, setPosition] = useState({ lat: -33.5344303 , lng: 25.78993 });
  // const [img, setImg] = useState();
  const [capture, setCapture] = useState();
  const [appRef, setAppRef] = useState();
  const [model, setModel] = useState();


  useEffect(() => {
    const t = setTimeout(() => {
      setMapActive(true);
    }, 100);
    return () => clearTimeout(t);
  }, []);
  
  const handleUserChoice = async () => {
    await captureElement();

  };
  
  const handleRef = (e) => {
    setAppRef(e);
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
      const results = await classifier.detect(capture)
      // const results = await classifier.predict(imgRef.current);
      if(results.length === 0) return console.log('no results');
        console.log(results);
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
      <div  ref={handleRef} className="game-wrapper">
   <button onClick={handleUserChoice} style={{position:"absolute", height: '40px', zIndex: '9'}}>predict</button>
        <ReactStreetview
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
      </div>
      {/* {mapActive && <SmallMap getAnswer={handleUserChoice} />} */}
    </>
  );
}

export default AiSpy;
