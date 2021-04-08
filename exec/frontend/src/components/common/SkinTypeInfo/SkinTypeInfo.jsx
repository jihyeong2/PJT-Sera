import React from 'react';
import styles from './SkinTypeInfo.module.css';

const SkinTypeInfo = ({color,title,content}) =>{
  return(
    <>
      <div className={styles.title}>
        <span style={{color:`${color}`}}>{title[0]}</span>
        {title.slice(1,)}
      </div>
      <div className={styles.content}>
        {content}
      </div>
    </>
  )
};

export default SkinTypeInfo;