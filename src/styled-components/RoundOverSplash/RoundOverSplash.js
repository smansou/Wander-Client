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
            <button className='splash-btn btn1 splash-continue' onClick={props.callback1}> <span>{props.text1}</span></button>
            <button className='splash-btn btn2 splash-continue' style={!props.text2 ? {display: 'none'} : {display: 'block'}} onClick={props.callback2}> <span>{props.text2}</span></button>
            </div>
        </div>
    </div>
  )
}
