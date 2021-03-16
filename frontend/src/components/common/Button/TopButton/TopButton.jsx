import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './TopButton.module.css';

const TopButton = ({onClick}) => {
  return (
    <button onClick={onClick} className={styles.top_button}>
      <div className={styles.arrow}>
        <FontAwesomeIcon  icon="chevron-up" size="lg" color="#CCCCCC"/>
      </div>
      <div className={styles.text}>
        TOP
      </div>
    </button>
  );
};

export default TopButton;