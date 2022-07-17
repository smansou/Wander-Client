import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./footer.css";

export default function Footer() {
  const navigateTo = useNavigate();
  return (
    <div className="ui  vertical footer segment">
        <div className="ui container">
          <div
            className="ui stackable inverted divided equal height stackable grid"
          >
            <div className="three wide column">
              <h4 className="ui inverted header">About</h4>
              <div className="ui inverted link list">
                <span className="item">Sitemap</span>
                <span className="item">Contact Us</span>
              </div>
            </div>
            <div className="three wide column">
              <h4 className="ui inverted header">Services</h4>
              <div className="ui inverted link list">
                <span onClick={()=>navigateTo('/guessLocation/home')} className="item link-style">Classic</span>
                <span onClick={()=>navigateTo('/aispy')} className="item link-style" >AI-SPY</span>
                <span className="item">FAQ</span>
              </div>
            </div>
            <div className="seven wide column">
              <h4 className="ui inverted header">Info</h4>
              <p className='ui grey inverted small header'>
                
               Free & always will be ♡ <br/> <br/>Built with love by <a href='http://github.com/smansou'>smansou</a>
              </p>
            </div>
          </div>
        </div>
      </div>

  )
}
