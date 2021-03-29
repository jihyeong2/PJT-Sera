import { Grid } from '@material-ui/core';
import React, {useState} from 'react';
import Elements from '../common/SkinHexagon/Elements';
import SkinHexagon from '../common/SkinHexagon/SkinHexagon';
import SkinHexagonInfo from '../common/SkinHexagon/SkinHexagonInfo';
import styles from './home2.module.css';
const Home2 = (props) => {
  const [currTag,setCurrTag] = useState('OSPT');
  const onChangeTag = (tag) => {
    setCurrTag(tag);
  }
  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={8}>
          <Grid
            container
            direction="column"
          >
          <div className={styles.text_box}>
            <div className={styles.title}>
              16가지 피부유형 분석 <br/>
              바우만 피부타입 테스트
            </div>
            <div className={styles.content}>
              새라는 피부타입 테스트를 제공하며<br/>
              피부유형별 성분 분석, 맞춤 화장품을 추천합니다.
            </div>
          </div>
          <SkinHexagon onChangeTag={onChangeTag}/>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <SkinHexagonInfo currTag={currTag}/>
          <Elements currTag={currTag}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home2;