import React, { useEffect } from 'react';
import './test.css';
import Home1 from '../../components/Home/home1';
import Home2 from '../../components/Home/home2';
import Home3 from '../../components/Home/home3';
import Home4 from '../../components/Home/home4';
import Navbar from '../../components/common/Navbar/Navbar';
const Home = (props) => {
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
      // content.style.transform = 'translateY(-'+ count*100 +'vh)';
      document.querySelector('.sec_button.active').classList.remove('active');
      buttons[count].classList.add('active');
    }
    return () => {
      window.removeEventListener('mousewheel',wheelEvent);
    }
  },[])
  return(
    <div className="fullscreen">
      <Navbar/>
      <div className="main__content">
        <section data-title="Home" className="fbx" style={{backgroundColor:'#000000',}}>
          <div className="sec_container">
            <Home1/>
          </div>
        </section>
        <section data-title="Services" className="fbx" style={{backgroundColor:'#000000'}}>
          <div className="sec_container">
            <Home2/>
          </div>
        </section>
        <section data-title="Contact us" className="fbx" style={{backgroundColor:'#000000'}}>
          <div className="sec_container">
            <Home3/>
          </div>
        </section>
        <section data-title="Contact us" className="fbx" style={{backgroundColor:'#000000'}}>
          <div className="sec_container">
            <Home4/>
          </div>
        </section>
      </div>
      <div className="section_navigation">
        <div className="sec_button"></div>
        <div className="sec_button"></div>
        <div className="sec_button"></div>
        <div className="sec_button"></div>
      </div>
    </div>
  )
}

export default Home;