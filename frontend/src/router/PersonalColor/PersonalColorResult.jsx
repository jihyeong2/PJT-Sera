import React from 'react';
import styles from './PersonalColorResult.module.css';
import {useState} from 'react';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import {connect} from 'react-redux';
import image from '../../assets/mainz.png';
import { Grid } from '@material-ui/core';
import BeautyTip from '../../components/common/BeautyTip/BeautyTip';
import ColorPalette from '../../components/common/Pallette/ColorPalette';
const PersonalColorResult = ({user,color}) => {
  return (
    <div style={{position:'relative', paddingBottom:'180px', minHeight:"100vh"}}>
      <div className={styles.container}>
        <Navbar/>
        <div className={styles.logo_box}>
          <Logo type={1}/>
        </div>
        <div className={styles.header}>
          <span className={styles.title}>퍼스널컬러 진단 결과</span><br/>
        </div>
        <div className={styles.color_box}>
          <div className={styles.color_box_header}>
            당신의 퍼스널 컬러는 <br/>
            <span 
              className={styles.bold_text}
              style={{color:`${color[user.personalColor].color}`}}
            >
              {user.personalColor.slice(0,user.personalColor.length-1)} {user.personalColor[user.personalColor.length-1]}  
            </span> 입니다.
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
                    <div style={{color:`${color[user.personalColor].color}`}} className={styles.color_box_title}>
                      {color[user.personalColor].english}
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className={styles.info_box}>
                      <span className={styles.info}>{color[user.personalColor].desc}</span>
                    </div>
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
                <BeautyTip currTag={user.personalColor}/>
              </Grid>
              <Grid item xs={6}>
                <div className={styles.tip_title}>
                  나의 <span style={{fontWeight:'700'}}>컬러 플레이스</span>
                </div>
                <ColorPalette currTag={user.personalColor}/>
              </Grid>        
            </Grid>
          </div>          
        </div>
      </div>
      <Footer/>
    </div>
  ) 
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  color: state.color,
})


export default connect(
  mapStateToProps,
)(PersonalColorResult);