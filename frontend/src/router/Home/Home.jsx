// // import React from 'react';
// // import styles from './Home.module.css';
// // import Logo from '../../components/common/Logo/Logo';
// // import Navbar from '../../components/common/Navbar/Navbar';
// // const Home = (props) => {
// //   return(
// //     <div className={styles.container}>
// //       <Navbar/>
// //       <Logo type={1}/>
// //     </div>
// //   );
// // };
// // export default Home;
// // import React from "react";
// // import ScrollableContainer from "react-full-page-scroll";

// // const PageComponent = ({children}) => {
// //   return (<div>{children}</div>)
// // }

// // function Home() {
// //   const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
// //   const FadeUp = batch(Fade(), Move(), Sticky());
// //   return (
// //     <ScrollableContainer animationTime={1000}>
// //       <PageComponent>
// //         Page One
// //       </PageComponent>
// //       <PageComponent>Page Two</PageComponent>
// //       <PageComponent>Page Three</PageComponent>
// //     </ScrollableContainer>
// //   );
// // }

// // export default Home;
// import React from "react";

// // import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";
// import * as Scroll from 'react-scroll';
// import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
// import Home1 from '../../components/Home/home2';
// import Home2 from '../../components/Home/home2';
// import Home3 from '../../components/Home/home3';
// import Home4 from '../../components/Home/home4';
// function Home() {
//   // const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
//   // const FadeUp = batch(Fade(), Move(), Sticky());
//   return (
//     // <ScrollContainer>
//     //   <ScrollPage page={0}>
//     //     <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
//     //       <span style={{ fontSize: "3em" }}>Home 😀</span>
//     //     </Animator>
//     //   </ScrollPage>
//     //   <ScrollPage page={1}>
//     //     <Animator animation={ZoomInScrollOut}>
//     //       <span style={{ fontSize: "3em" }}>Home1 ✨</span>
//     //     </Animator>
//     //   </ScrollPage>
//     //   <ScrollPage page={2}>
//     //     <Animator animation={FadeUp}>
//     //       <span style={{ fontSize: "3em" }}>Home2 ⛅️</span>
//     //     </Animator>
//     //   </ScrollPage>
//     //   <ScrollPage page={3}>
//     //     <div >
//     //       <span style={{ fontSize: "3em" }}>
//     //         <Animator animation={MoveIn(1000, 0)}>Home3 🙋🏻‍♀️</Animator>
//     //       </span>
//     //     </div>
//     //   </ScrollPage>
//     //   <ScrollPage page={4}>
//     //     <Animator animation={batch(Fade(), Sticky())}>
//     //       <span style={{ fontSize: "3em" }}>Home4</span>
//     //     </Animator>
//     //   </ScrollPage>
//     // </ScrollContainer>
//     <div>
//       <Element name="home1" className="element">
//         <Home1/>
//       </Element>
//       <Element name="home1" className="element">
//         <Home2/>
//       </Element>
//       <Element name="home1" className="element">
//         <Home3/>
//       </Element>
//       <Element name="home1" className="element">
//         <Home4/>
//       </Element>
//     </div>
//   );
// }


// export default Home;
import React, { useEffect } from 'react';
import './test.css';
import Home1 from '../../components/Home/home1';
import Home2 from '../../components/Home/home2';
import Home3 from '../../components/Home/home3';
import Home4 from '../../components/Home/home4';
const Home = (props) => {
  useEffect(()=>{
    // const fullscreen = document.querySelector('.fullscreen');
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
    window.addEventListener('mousewheel', function(e) {
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
    });
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
  },[])
  return(
    <div className="fullscreen">
      <div className="main__content">
        <section data-title="Home" className="fbx" style={{backgroundColor:'#000000',}}>
          <div className="sec_container home">
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
      <div class="section_navigation">
        <div class="sec_button"></div>
        <div class="sec_button"></div>
        <div class="sec_button"></div>
        <div class="sec_button"></div>
      </div>
    </div>
  )
}

export default Home;