import React from 'react';
import "./footer.css";

export default function Footer() {
  return (
    <div className="ui  vertical footer segment">
        <div className="ui container">
          <div
            className="ui stackable inverted divided equal height stackable grid"
          >
            <div className="three wide column">
              <h4 className="ui inverted header">About</h4>
              <div className="ui inverted link list">
                <a className="item">Sitemap</a>
                <a className="item">Contact Us</a>
              </div>
            </div>
            <div className="three wide column">
              <h4 className="ui inverted header">Services</h4>
              <div className="ui inverted link list">
                <a className="item">Where Am I?</a>
                <a className="item">AI-SPY</a>
                <a className="item">FAQ</a>
              </div>
            </div>
            <div className="seven wide column">
              <h4 className="ui inverted header">Footer Header</h4>
              <p className='ui grey inverted small header'>
                
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </div>
          </div>
        </div>
      </div>

  )
}
