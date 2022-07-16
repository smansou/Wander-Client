import React from 'react';
import './statnav.css';
import logo from '../../assets/images/logo1.png'
import { useNavigate } from 'react-router';


export default function Statnav(props) {
  const navigateTo = useNavigate();
  return (
    <div className='stat-nav-container'>
        <img onClick={()=>navigateTo('/home')}  src={logo} alt="logo" />
        <div className="nav-stats">
        <div className="navstat 1">{props.stat1}</div>
        <div className="navstat 2">{props.stat2}</div>
        <div className="navstat 3">{props.stat3}</div>
        </div>
        
    </div>
  )
}
