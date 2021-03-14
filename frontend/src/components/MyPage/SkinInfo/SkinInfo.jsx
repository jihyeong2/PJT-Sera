import React from 'react';
import styles from './SkinInfo.module.css';
import MyPageTabs from '../MyPageTabs/MyPageTabs';

const SkinInfo = (props) => {
  return (
    <div className={styles.container}>
      <section className={styles.info_box}>
        <div className={styles.info_left}>
          <div className={styles.username}>
            <span className={styles.name}>다우니</span>
            님의 피부타입</div>
          <div className={styles.user_info}>여성 | 26세</div>
          <ul className={styles.skin_box}>
            <div className={styles.skin_info1}>
              <span className={styles.skin_text}>건조</span>
            </div>
            <div className={styles.skin_info2}>
              <span className={styles.skin_text}>민감</span>
              <span className={styles.skin_arrow}>↑</span>
            </div>
            <div className={styles.skin_info3}>
              <span className={styles.skin_text}>색소</span>
              <span className={styles.skin_arrow}>↑</span>
            </div>
            <div className={styles.skin_info4}>
              <span className={styles.skin_text}>주름</span>
              <span className={styles.skin_arrow}>↓</span>
            </div>
          </ul>
        </div>
        <div className={styles.info_right}>
          <div className={styles.skin_type}>OSPW</div>
          <div className={styles.color_type}>봄웜</div>
        </div>
      </section>
      <MyPageTabs/>
    </div>
  );
}

export default SkinInfo;