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
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <SkinInfo/>
        </Grid>
        <Grid item xs={12}>
          <MyPageTabs/>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyPage;