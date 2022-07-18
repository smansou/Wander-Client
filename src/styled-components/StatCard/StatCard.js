import React, {useRef} from 'react';
import './statCard.css';
import {useInViewport} from 'react-in-viewport';


export default function StatCard(props) { 
  const myRef = useRef();
  const {inViewport, enterCount } = useInViewport( myRef );
  return (
    <div ref={myRef} className={`stat-card-container ${(inViewport && (enterCount<=2)) && 'animateIn'}`}>
      <div className="text-wrapper">
      <h1 className='stat-number'>{props.statNumber}</h1>
        <div className="ui divider"></div>
        <h2 className='stat-title'>{props.statTitle}</h2>
      </div>
        
    </div>
  )
}

