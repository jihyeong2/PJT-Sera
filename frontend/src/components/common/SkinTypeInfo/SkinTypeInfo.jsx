import React from 'react';
import styles from './SkinTypeInfo.module.css';

const SkinTypeInfo = (props) =>{
  return(
    <>
      <div className={styles.title}>
        <span className={styles.highlight}>O</span>
        ily (지성)
      </div>
      <div className={styles.content}>
        번들거림이 보이고 여드름이 나타나는 피부
      </div>
    </>
  )
};

export default SkinTypeInfo;