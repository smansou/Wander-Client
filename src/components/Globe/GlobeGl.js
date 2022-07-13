
import React from "react";
import { useEffect, useState, useRef } from "react";
import Globe from "react-globe.gl";
import '../Homepage/homepage.css';


export default function GlobeGl() {
const globeEl = useRef();

useEffect(() => {
  globeEl.current.controls().autoRotate = true;
  globeEl.current.controls().autoRotateSpeed = 0.5;
  globeEl.current.controls().enableZoom = false;

  
  
})

const N = 20;
const arcsData = [...Array(N).keys()].map((_, index) => ({
startLat: (Math.random() - 0.5) * 180,
startLng: (Math.random() - 0.5) * 360,
endLat: (Math.random() - 0.5) * 180,
endLng: (Math.random() - 0.5) * 360,
name: 'name',
color: [["blue", "blue", "blue"][Math.round(Math.random() * 3)], ["white", "white", "blue", "white"][Math.round(Math.random() * 3)]],
endpoint: `https://google.com?q=${index}`
}));


  return (
    // <div className="globe-container">
    <Globe ref={globeEl} 
    width={1200}
    height={1200}
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
    // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    animateIn={true}
    backgroundColor="rgba(0,0,0,0)"
    showAtmosphere={true}
        // arcsData={arcsData}
        // arcColor={"color"}
        // arcStroke={1.2}
        // arcDashLength={() => Math.random()}
        // arcDashGap={() => Math.random()}
        // arcDashAnimateTime={() => 4000}
        // onArcClick={(arcProps) => {
        //   window.open(arcProps.endpoint)}}
          
    />
    // </div>
  )
}
