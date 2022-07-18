import React, {useRef} from 'react'
import './animatedCard.css';
import {useInViewport} from 'react-in-viewport';

export default function AnimatedCard(props) {
  const myRef = useRef();
    const {inViewport, enterCount } = useInViewport( myRef );
  

  return (
   
  <div ref={myRef} className={`card ${(inViewport && (enterCount<=2)) && props.animationName}`} data-effect="zoom">
   
    <figure  className="card__image">
      <img src={props.bgImage}/>
    </figure>
    <div className="card__header">
      <figure className="card__profile">
        <img src={props.roundImage}/>
      </figure>
    </div>
    <div className="card__body">
      <h3 className="card__name">{props.primaryText} </h3>
      <p className="card__job">{props.secondaryText}</p>
      <p className="card__bio"> {props.innerText}</p>
    </div>
  </div>

  

  )
}
