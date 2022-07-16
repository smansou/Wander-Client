import React, {useRef} from 'react';
import './statCard.css';
import {useInViewport} from 'react-in-viewport';


export default function StatCard(props) { 
  const myRef = useRef();
  const {inViewport } = useInViewport( myRef );
  return (
    <div ref={myRef} className={`stat-card-container ${inViewport && 'animateIn'}`}>
      <div className="text-wrapper">
      <h1 className='stat-number'>{props.statNumber}</h1>
        <h2 className='stat-title'>{props.statTitle}</h2>
      </div>
        
    </div>
  )
}

