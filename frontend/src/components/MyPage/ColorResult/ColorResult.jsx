import React from 'react';
import styles from './ColorResult.module.css';
import image from '../../../assets/mainz.png';
import { Grid } from '@material-ui/core';
import BeautyTip from '../../common/BeautyTip/BeautyTip';
import ColorPalette from '../../common/Pallette/ColorPalette';
const ColorResult = (props) => {
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        당신의 퍼스널 컬러는 <br/>
        <span className={styles.highlight}>봄 웜</span> 입니다.
      </div>
      <div className={styles.box}>
        <Grid className={styles.table} container spacing={3}>
          <Grid item xs={5}>
            <img style={{maxWidth:'100%',minHeight:'100%',objectFit:'cover'}} className={styles.image} src={image} alt=""/>
          </Grid>
          <Grid item xs={7}>
            <Grid 
              container
              spacing={3}
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <span className={styles.title}>SPRING WARM</span>
              </Grid>
              <Grid item xs={12}>
                <span className={styles.info}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nemo quam laboriosam culpa dolores porro hic maiores minima nam neque, iure explicabo ab animi illo doloremque! Fugiat porro ullam mollitia?</span>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className={styles.box2}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <div className={styles.tip_title}>
              나의 <span style={{fontWeight:'700'}}>뷰티 Tip</span>
            </div>
            <BeautyTip/>
          </Grid>
          <Grid item xs={6}>
            <div className={styles.tip_title}>
              나의 <span style={{fontWeight:'700'}}>컬러 플레이스</span>
            </div>
            <ColorPalette/>
          </Grid>        
        </Grid>
      </div>

    </div>
  )
};

export default ColorResult;