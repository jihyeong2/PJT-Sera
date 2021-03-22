// import React from 'react';
// import styles from './Home.module.css';
// import Logo from '../../components/common/Logo/Logo';
// import Navbar from '../../components/common/Navbar/Navbar';
// const Home = (props) => {
//   return(
//     <div className={styles.container}>
//       <Navbar/>
//       <Logo type={1}/>
//     </div>
//   );
// };
// export default Home;
// import React from "react";
// import ScrollableContainer from "react-full-page-scroll";

// const PageComponent = ({children}) => {
//   return (<div>{children}</div>)
// }

// function Home() {
//   const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
//   const FadeUp = batch(Fade(), Move(), Sticky());
//   return (
//     <ScrollableContainer animationTime={1000}>
//       <PageComponent>
//         Page One
//       </PageComponent>
//       <PageComponent>Page Two</PageComponent>
//       <PageComponent>Page Three</PageComponent>
//     </ScrollableContainer>
//   );
// }

// export default Home;
import React from "react";

import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

function Home() {
  const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
  const FadeUp = batch(Fade(), Move(), Sticky());
  return (
    <ScrollContainer>
      <ScrollPage page={0}>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
          <span style={{ fontSize: "3em" }}>Home 😀</span>
        </Animator>
      </ScrollPage>
      <ScrollPage page={1}>
        <Animator animation={ZoomInScrollOut}>
          <span style={{ fontSize: "3em" }}>Home1 ✨</span>
        </Animator>
      </ScrollPage>
      <ScrollPage page={2}>
        <Animator animation={FadeUp}>
          <span style={{ fontSize: "3em" }}>Home2 ⛅️</span>
        </Animator>
      </ScrollPage>
      <ScrollPage page={3}>
        <div >
          <span style={{ fontSize: "3em" }}>
            <Animator animation={MoveIn(1000, 0)}>Home3 🙋🏻‍♀️</Animator>
          </span>
        </div>
      </ScrollPage>
      <ScrollPage page={4}>
        <Animator animation={batch(Fade(), Sticky())}>
          <span style={{ fontSize: "3em" }}>Home4</span>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
}


export default Home;