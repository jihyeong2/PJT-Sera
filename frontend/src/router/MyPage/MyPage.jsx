import React from 'react';
import styles from './Mypage.module.css';
import SkinInfo from '../../components/MyPage/SkinInfo/SkinInfo';
import MyPageTabs from '../../components/MyPage/MyPageTabs/MyPageTabs';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';

const MyPage = (props) => {
  return (
    <div className={styles.container}>
      <Navbar/>
      <Logo type={1}/>
      <div className={styles.title}>
        마이페이지
      </div>
      <SkinInfo s/>
      <MyPageTabs/>
    </div>
  );
};

export default MyPage;