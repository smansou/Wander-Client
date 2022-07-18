import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import "./splashMap.css";
import marker from '../../assets/images/marker.png';


export default function SmallMap(props) {
    const [markers, setMarkers] = useState();
   
    const [choiceCoords, setchoiceCoords] = useState({
      lat: null,
      lng: null
    })
    
  return ( 
    <div className="splash-map-container">
      <GoogleMapReact
      center={{lat: props.position.lat, lng: props.position.lng}}
      yesIWantToUseGoogleMapApiInternals = {true}
      
        options={{
          fullscreenControl: false,
          draggableCursor: false,
          zoomControl: false,
          draggable: true,
          
}}
        defaultCenter={{ lat: 50, lng: 30 }}
        defaultZoom={11}
        bootstrapURLKeys={{ key: process.env.GOOGLE_MAPS_API_KEY }} >

          <div lat={choiceCoords.lat} lng={choiceCoords.lng}>
             <img style={{width: '23px', height:'38px'}} src={marker} alt="X" />
          </div>

          <div lat={props.position.lat} lng={props.position.lng}>
              <img className="marker-img" style={{width: '23px', height:'38px'}} src={marker} alt="X" />
          </div>
        </GoogleMapReact> 
    </div>

  );
}
