import React, { useState } from "react";
import GoogleMapReact from "google-map-react"
import "./smallMap.css";

export default function SmallMap(props) {
  const [showMarker, setShowMarker] = useState(false);
  const [expandMap, setExpandMap] = useState(false);
  const [buttonState, setButtonState] = useState({
    disabled: true,
    opacity: 0.5
  })
  const [choiceCoords, setchoiceCoords] = useState({
    lat: null,
    lng: null
  })
  
  const ArrowLeft = () =>{
    return (
      !expandMap ?  
      <svg className="arrow-svg" onClick={()=>setExpandMap(true)}  width="30" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 8l-5.247 6.44-5.263-6.44-.737.678 6 7.322 6-7.335-.753-.665z"/></svg>
           :
           <svg onClick={()=>setExpandMap(false)} width="30" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm5.247 15l-5.247-6.44-5.263 6.44-.737-.678 6-7.322 6 7.335-.753.665z"/></svg>
      )
  }
const toggleExpand = ()=>{
  setExpandMap(!expandMap);
}
const handleMapClick = (e) =>{
    setButtonState({disabled: false, opacity: 1});
  setchoiceCoords({lat: e.lat, lng: e.lng})
 
}
  return (
    <>
    <div className="mobile-small-map">


    <div onClick={toggleExpand} className={expandMap ? "small-map-container-expand" : "small-map-container"}>
      <GoogleMapReact
        options={{
          fullscreenControl: false,
          draggableCursor:'crosshair'
        }}
        defaultCenter={{ lat: 50, lng: 30 }}
        defaultZoom={11}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        onClick={handleMapClick}
        >
          <div style={{display: showMarker}} lat={choiceCoords.lat} lng={choiceCoords.lng}>/\/\\/\/MARKER/\/\/\\\/\</div>
        </GoogleMapReact>
        <button 
        onClick={e => props.getAnswer(choiceCoords.lat, choiceCoords.lng) }
        style={{opacity:buttonState.opacity}}
         disabled={buttonState.disabled} 
         className="guess-button">GUESS
         </button>
    </div>
          <ArrowLeft />

    </div>
    
    </>
  );
}
