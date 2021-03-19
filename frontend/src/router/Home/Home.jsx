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
import React from "react";
import ScrollableContainer from "react-full-page-scroll";

const PageComponent = ({children}) => {
  return (<div>{children}</div>)
}

function App() {
  return (
    <ScrollableContainer animationTime={1000}>
      <PageComponent>Page One</PageComponent>
      <PageComponent>Page Two</PageComponent>
      <PageComponent>Page Three</PageComponent>
    </ScrollableContainer>
  );
}

export default App;