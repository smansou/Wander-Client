import React from 'react'
import './animatedCard.css';

export default function AnimatedCard(props) {

   


  return (
   
  <div className="card" data-effect="zoom">
   
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
