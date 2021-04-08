import React, { useState } from 'react';
import './home1.scss';
import Logo from '../common/Logo/Logo';
import mainImg from '../../assets/mainz.png';
const Home1 = (props) => {
  const [typeNum,setTypeNum] = useState(1);
  const onClick = (e) =>{
    if(e.target.checked){
      setTypeNum(3);
      props.onClickImage();
    } else{
      setTypeNum(1);
    }
  }
  return (
      <div class="wrapper">
        <Logo type={typeNum} style={{float:'left',}}/>
        <input type="checkbox" onClick={onClick}/>
        <div class="video">
          <img src={mainImg} alt="사진"/>
        </div>
        {/* <div class="text">
          <span data-text="Click Me fdsajklfdjskalfjdslkk"></span>
        </div> */}
      </div>
  );
}

export default Home1;