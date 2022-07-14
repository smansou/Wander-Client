import React, { useState } from "react";
import GoogleMapReact from "google-map-react"
import "./smallMap.css";

export default function SmallMap(props) {
    const [showMarker, setShowMarker] = useState(false);
    const [buttonState, setButtonState] = useState({
      disabled: true,
      opacity: 0.5
    })
    const [choiceCoords, setchoiceCoords] = useState({
      lat: null,
      lng: null
    })

const handleMapClick = (e) =>{
    setButtonState({disabled: false, opacity: 1});
  setchoiceCoords({lat: e.lat, lng: e.lng})
 
}
  return (
    
    <div className="small-map-container">
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
        style={{opacity:buttonState.opacity, backgroundColor: 'green'}}
         disabled={buttonState.disabled} 
         className="guess-button">GUESS
         </button>
    </div>

  );
}
