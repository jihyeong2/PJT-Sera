import React from 'react';
import styles from './Logo.module.css';
import logo1 from '../../../assets/SeraLogo1.png';
import logo2 from '../../../assets/SeraLogo2.png';
import logo3 from '../../../assets/SeraLogo3.png';
import { useHistory } from 'react-router';

const Logo = ({type}) => {
  const history = useHistory();
  const onClick = () => {
    history.push('/');
  }
  if (type===1){
    return(
      <img src={logo1} alt="Logo" className={[styles.large,styles.btn].join(' ')} onClick={onClick}/>
    );
  } else if (type===2){
    return(
      <img src={logo2} alt="Logo" className={[styles.small,styles.btn].join(' ')} />
    );
  } else {
    return(
      <img src={logo3} alt="Logo" className={[styles.large,styles.btn].join(' ')} onClick={onClick}/>
    );
  }
};

export default Logo;