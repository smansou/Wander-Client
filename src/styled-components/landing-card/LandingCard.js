import React, { useEffect, useRef, useState } from 'react';
import "./landingCard.css";
import {useInViewport} from 'react-in-viewport';


export default function LandingCard(props) {

    const myRef = useRef();
    const {inViewport, enterCount } = useInViewport( myRef );


  return (
    <div ref={myRef} className={`landing-card-container ${inViewport && 'animateIn'}`}>
      <div className="landing-text-wrapper">
      <h1 className="landing-card-title">{props.title}</h1>
        <p className="landing-card-text">{props.text}</p>
      </div>
      <div className="land-img-wrapper"><img className='landing-card-image' src={props.imageURL} />
</div>
    </div>
  )
}


