import React from 'react';
import './home1.scss';
import mainImg from '../../assets/mainz.png';
const Home1 = (props) => {
  return (
      <div class="wrapper">
        <input type="checkbox"/>
        <div class="video">
          <img src={mainImg} alt="사진"/>
        </div>
        <div class="text">
          <span data-text="Click"></span>
        </div>
      </div>
  );
}

export default Home1;