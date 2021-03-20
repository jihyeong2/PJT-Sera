import React from 'react';
import styles from './Footer.module.css';
import Logo from '../Logo/Logo';

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.text}>
        대표이사: 유진이(YOO JIN YI)  주소 : 대전광역시 유성구 동서대로 98-39  대표전화 : 010-7123-1815
      </div>
      <div className={styles.text}>
        호스팅사업자 : SERA   이메일 : unni2@naver.com
      </div>
      <div className={styles.text}>
        <Logo type={2}/>
        <span> Copyright (c) 2021 SERA. All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;