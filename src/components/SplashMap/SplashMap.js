import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./splashMap.css";

export default function SmallMap(props) {
    const [markers, setMarkers] = useState();
   
    const [choiceCoords, setchoiceCoords] = useState({
      lat: null,
      lng: null
    })
  return ( 
    <div className="splash-map-container">
      <GoogleMapReact
        options={{
          fullscreenControl: false,
          draggableCursor:'crosshair',
          zoomControl: false
}}
        defaultCenter={{ lat: 50, lng: 30 }}
        defaultZoom={11}
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }} >
          <div lat={choiceCoords.lat} lng={choiceCoords.lng}>/\/\\/\/MARKER/\/\/\\\/\</div>
          <div lat={choiceCoords.lat} lng={choiceCoords.lng}>/\/\\/\/MARKER/\/\/\\\/\</div>
        </GoogleMapReact> 
    </div>

  );
}
