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
            
            <div className="splash-btn-container">
            <button className='splash-btn btn1' onClick={()=>navigateTo('/guesslocation/world')}> <span>Continue</span></button>
            <button className='splash-btn btn2' onClick={()=>navigateTo('/home')}> <span>Home</span></button>
            </div>
        </div>
    </div>
  )
}
