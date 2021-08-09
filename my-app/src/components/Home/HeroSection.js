import React from "react";
// import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src='/assets/video1.mp4' autoPlay loop muted /> */}
      <h1>PROMENADE</h1>
      <p>Walk your authentic path.</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'>
          SHOP
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
