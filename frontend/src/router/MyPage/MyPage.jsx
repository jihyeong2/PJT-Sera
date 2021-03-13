import React from 'react';
import styles from './Mypage.module.css';
import SkinInfo from '../../components/MyPage/SkinInfo/SkinInfo';

const MyPage = (props) => {
  return (
    <div className={styles.container}>
      {/* <Navbar/> */}
      {/* <Header/> */}
      <header className={styles.title}>
        마이페이지
      </header>
      <SkinInfo/>
    </div>
  );
};

export default MyPage;