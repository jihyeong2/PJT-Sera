import React from 'react';
import styles from './Mypage.module.css';
import SkinInfo from '../../components/MyPage/SkinInfo/SkinInfo';
import MyPageTabs from '../../components/MyPage/MyPageTabs/MyPageTabs';
import Grid from '@material-ui/core/Grid';

const MyPage = (props) => {
  return (
    <div className={styles.container}>
      {/* <Navbar/> */}
      {/* <Header/> */}
      <header className={styles.title}>
        마이페이지
      </header>
      <SkinInfo/>
      <MyPageTabs/>
    </div>
  );
};

export default MyPage;