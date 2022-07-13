import React from 'react';
import "./landingCard.css";

export default function LandingCard(props) {
  return (
    <div className='landing-card-container'>
      <div className="landing-text-wrapper">
      <h1 className="landing-card-title">{props.title}</h1>
        <p className="landing-card-text">{props.text}</p>
      </div>
        <img className='landing-card-image' src={props.imageURL} />
    </div>
  )
}
