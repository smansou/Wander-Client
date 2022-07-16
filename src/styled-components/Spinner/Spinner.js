import React from 'react';
import {SpinnerCircular} from "spinners-react";


export default function Spinner() {
  return (
    <div style={{position: 'absolute', height: '100%', width: '100%', display:'flex', justifyContent: 'center', alignItems:'center', zIndex: '40'}}>  
          <SpinnerCircular size={70} thickness={136} speed={105} color="rgba(241, 206, 83, 1)" />
    </div>
  )
}
