import React from 'react';
import './roundOverSplash.css';
import SmallMap from '../../components/SmallMap/SmallMap';
import SplashMap from "../../../src/components/SplashMap/SplashMap";
import {useNavigate} from 'react-router-dom';


export default function RoundOverSplash(props) {
  const navigateTo = useNavigate();

  return (
    <div className='round-over-splash'>
        <div className="splash-container">
            <div className="upper-splash">{props.title}</div>
            <div className="middle-splash">{props.middle} </div>
            
            <div className="lower-splash">{props.lower}</div>
            <button onClick={()=>navigateTo('/home')}>Continue</button>
            <button onClick={()=>navigateTo('/home')}>Home</button>

        </div>
    </div>
  )
}
