import React from 'react';
import './home1.scss';
const Home1 = (props) => {
  return (
      <div class="wrapper">
        <input type="checkbox"/>
        <div class="video">
          <img src="./mainz.png" alt=""/>
          {/* <video src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_1.mp4" loop muted autoplay></video> */}
        </div>
        <div class="text">
          <span data-text="Watch the video"></span>
        </div>
      </div>
  );
}

export default Home1;