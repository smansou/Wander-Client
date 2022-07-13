import React from 'react';
import './roundOverSplash.css';
import SmallMap from '../../components/SmallMap/SmallMap';
import SplashMap from "../../../src/components/SplashMap/SplashMap";
import {useNavigate} from 'react-router-dom';


export default function RoundOverSplash() {
  const navigateTo = useNavigate();

  return (
    <div className='round-over-splash'>
        <div className="splash-container">
            <div className="upper-splash">upper</div>
            <div className="middle-splash"><SplashMap /> </div>
            
            <div className="lower-splash">lower</div>
            <button onClick={()=>navigateTo('/home')}>Continue</button>

        </div>
    </div>
  )
}
