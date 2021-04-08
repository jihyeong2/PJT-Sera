import React, { useEffect, useState } from 'react';
import './test.css';
import Home1 from '../../components/Home/home1';
import Home2 from '../../components/Home/home2';
import Home3 from '../../components/Home/home3';
import Home4 from '../../components/Home/home4';
import Navbar from '../../components/common/Navbar/Navbar';

const Home = () => {
  const [isWhite, setIsWhite] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  useEffect(()=>{
    const sections = document.querySelectorAll('section');
    const content = document.querySelector('.main__content');
    let spin_value = 0;
    let can_scroll = true;
    const buttons = document.querySelectorAll('.sec_button');
    buttons[0].classList.add('active');
    for ( let i=0; i<buttons.length; i++ ) {
      buttons[i].addEventListener('click', function() {
        document.querySelector('.sec_button.active').classList.remove('active');
        this.classList.add('active');
        spin_value = i;
        scroll_content(spin_value);
      });
    }
    function wheelEvent(e) {
      if ( can_scroll ) {
        can_scroll = false;
        if ( e.deltaY > 0 ) {
          // scroll down
          if ( spin_value < sections.length-1 ) spin_value += 1;
        } else {
          // scroll up
          if ( spin_value > 0 ) spin_value -= 1;
        }
        scroll_content(spin_value);
      }
      setTimeout(function() {
        can_scroll = true;
      }, 560);
    }
    window.addEventListener('mousewheel', wheelEvent);
    function scroll_content( count ) {
      content.setAttribute('style', '\
        -webkit-transform: translateY(-'+ count*100 +'vh);\
        -ms-transform: translateY(-'+ count*100 +'vh);\
        -o-transform: translateY(-'+ count*100 +'vh);\
        transform: translateY(-'+ count*100 +'vh);\
      ');
      document.querySelector('.sec_button.active').classList.remove('active');
      buttons[count].classList.add('active');
      document.querySelector('.sec_container.show') && document.querySelector('.sec_container.show').classList.remove('show');
      if(count===1){
        document.querySelector('.first').classList.add('show');
      } else if(count===2){
        document.querySelector('.second').classList.add('show');
      } else{
        document.querySelector('.third').classList.add('show');
      }
      if(isClicked){
        if(count===0) setIsWhite(true);
        else setIsWhite(false);
      } else{
        setIsWhite(false);
      }
    }
    return () => {
      window.removeEventListener('mousewheel',wheelEvent);
    }
  },[isClicked]);
  const onClickImage = () => {
    console.log(document.querySelector('.section_navigation').style);
    document.querySelector('.section_navigation').style.cssText='opacity: 1;';
    setIsClicked(true);
    setIsWhite(true);
  };
  return(
    <div className="fullscreen">
      <div style={{width:'80%'}}>
        <Navbar white={isWhite}/>
      </div>
      <div className="main__content">
        <section className="fbx" style={{backgroundColor:'#FFFFFF',}}>
          <div className="sec_container">
            <Home1 onClickImage={onClickImage}/>
          </div>
        </section>
        <section className="fbx" style={{backgroundColor:'#FFFFFF'}}>
          <div className="first sec_container no_show_left">
            <Home2/>
          </div>
        </section>
        <section className="fbx" style={{backgroundColor:'#F7F7F7'}}>
          <div className="second sec_container no_show_right">
            <Home3/>
          </div>
        </section>
        <section className="fbx" style={{backgroundColor:'#FFF4EE'}}>
          <div className="third sec_container no_show_left">
            <Home4/>
          </div>
        </section>
      </div>
      <div className="section_navigation" style={{opacity:0,}}>
        <div className="sec_button"></div>
        <div className="sec_button"></div>
        <div className="sec_button"></div>
        <div className="sec_button"></div>
      </div>
    </div>
  )
}

export default Home;