import React from 'react';
import "./banner.css";
import objDetPic from "../../assets/images/object-detection.png"

export default function Banner() {
  return (
    <div className='banner-container'>
        <h1 className="banner-text">AI-Spy</h1>
        <img src={objDetPic} alt="obj-detection" />
    </div>
  )
}
