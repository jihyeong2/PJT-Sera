import React from 'react';
import './home1.scss';
const Home1 = (props) => {
  return (
      <div class="wrapper">
        <input type="checkbox"/>
        <div class="video">
          {/* <img src="../../assets/mainz.png" alt="사진"/> */}
          <img src="https://cdn.pixabay.com/photo/2016/09/06/18/22/visitors-1649815_960_720.jpg" alt="사진"/>
          {/* <video src="https://www.robmillsarchitects.com/files/land/city/RMA_Web_land_city_1.mp4" loop muted autoplay></video> */}
        </div>
        <div class="text">
          <span data-text="Watch the video"></span>
        </div>
      </div>
  );
}

export default Home1;