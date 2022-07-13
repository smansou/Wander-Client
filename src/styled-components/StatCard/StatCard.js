import React from 'react';
import './statCard.css';


export default function StatCard(props) { 

  return (
    <div className='stat-card-container'>
      <div className="text-wrapper">
      <h1 className='stat-number'>{props.statNumber}</h1>
        <h2 className='stat-title'>{props.statTitle}</h2>
      </div>
        
    </div>
  )
}

