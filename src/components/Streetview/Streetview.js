import React from 'react';
import "./streetview.css";
import ReactStreetview from "react-google-streetview";


export default function Streetview(props) {

    const streetViewPanoramaOptions = {
        position: props.position,
        pov: { heading: 100, pitch: 0 },
        zoom: 1,
        addressControl: false,
        showRoadLabels: false,
        zoomControl: false,
        fullscreenControl: false,
        
      };

  return (
    <div className="streetview">
        <ReactStreetview
    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    streetViewPanoramaOptions={streetViewPanoramaOptions}
  />
    </div>
    
  )
}


