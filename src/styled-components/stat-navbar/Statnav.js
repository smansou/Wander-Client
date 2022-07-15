import React from 'react';
import './statnav.css';



export default function Statnav(props) {
  return (
    <div className='stat-nav-container'>
        <div className="logo">LOGO</div>
        <div className="nav-stats">
        <div className="navstat 1">{props.stat1}</div>
        <div className="navstat 2">{props.stat2}</div>
        <div className="navstat 3">{props.stat3}</div>
        </div>
        
    </div>
  )
}
