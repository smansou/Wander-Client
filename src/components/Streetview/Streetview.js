import React, {useContext} from 'react';
import "./streetview.css";
import ReactStreetview from "react-google-streetview";
import axios from 'axios';
import { GlobalContext } from '../providers/GlobalState';



export default function Streetview(props) {
  const { userState } = useContext(GlobalContext);

    const streetViewPanoramaOptions = {
        position: props.position,
        pov: { heading: 100, pitch: 0 },
        zoom: 1,
        addressControl: false,
        showRoadLabels: false,
        zoomControl: false,
        fullscreenControl: false,
        
      };
      let counter = 0;

const incDistanceTravelled =  async() =>{
  if (counter>2) {   
    counter = 0;
    await axios.patch('https://wander-earth.herokuapp.com/users/inc-distance', {
      email: userState.userEmail,
      distanceTravelled: 0.28
  })
}
}

  return (
    <div className="streetview">
        <ReactStreetview
        onPositionChanged={()=>{incDistanceTravelled(); counter=counter+1}}
    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    streetViewPanoramaOptions={streetViewPanoramaOptions}
  />
    </div>
    
  )
}


