
import ReactDOM from "react-dom";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Globe from "react-globe.gl";
import '../Homepage/homepage.css';
import axios from "axios";
import HEX_DATA from "./hex-data.json";
import { useNavigate } from "react-router";
import * as ReactDOMServer from 'react-dom/server'


export default function GlobeGl() {
const globeEl = useRef();
const [globeData,setGlobeData] = useState();
const [hex, setHex] = useState({ features: [] });
const navigateTo = useNavigate();
useEffect(() => {
  globeEl.current.controls().autoRotate = true;
  globeEl.current.controls().autoRotateSpeed = 0.5;
  globeEl.current.controls().enableZoom = false;
},[])


useEffect(() => {
  setHex(HEX_DATA);
  fetchMaps();
}, []);

const renderPopup = (mode) => {
  return (
    <div className="Popup">
      <div className="Popup__title">title</div>
      <div className="Popup__content">Game Mode: {mode}</div>
    </div>
  );
};

 async function fetchMaps(){
      try{
      const {data: maps} = await axios.get(`https://wander-earth.herokuapp.com/maps`);
      const latLng = maps.map((e)=>{
        return {
          lat: e.coordinates.lat,
           lng: e.coordinates.lng,
            mode: ReactDOMServer.renderToStaticMarkup(renderPopup(e.gameMode))
      }});
        setGlobeData(latLng);
    }catch(err){console.log(err);} 
    }
   

  return (
    <Globe ref={globeEl} 
    width={1200}
    height={1200}
    // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
    // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    animateIn={true}
    backgroundColor="rgba(0,0,0,0)"
    showAtmosphere={true}
    atmosphereColor=  "FCD900"
    atmosphereAltitude = {0.05}
    
    enablePointerInteraction={false}
        hexPolygonsData={hex.features}
        hexPolygonResolution={3} //values higher than 3 makes it buggy
        hexPolygonMargin={0.62}
        hexPolygonColor={useCallback(() => "#1b66b1", [])}
        pointsData={globeData}
        pointRadius	={0.2}
        pointsTransitionDuration={1000}
        pointAltitude={()=>Math.random()*0.2}
        pointResolution={4}
        pointLat={(p)=>p.lat}
        pointLng={(p)=>p.lng}
        pointLabel={(p)=>p.mode}
        onPointHover={(p)=> p.mode}
        onPointClick={()=>{navigateTo('/guessLocation/world')}}
// pointsMerge={true}
      

    />
  )
}
