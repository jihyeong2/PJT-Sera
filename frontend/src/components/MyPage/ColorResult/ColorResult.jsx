import React from 'react';
import styles from './ColorResult.module.css';
import image from '../../../assets/mainz.png';
import { Grid } from '@material-ui/core';
import {connect} from 'react-redux';
import BeautyTip from '../../common/BeautyTip/BeautyTip';
import ColorPalette from '../../common/Pallette/ColorPalette';
const ColorResult = ({user,color}) => {
  return(
    <div className={styles.container}>
      <div className={styles.header}>
        당신의 퍼스널 컬러는 <br/>
        <span 
          className={styles.highlight}
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
                <span style={{color:`${color[user.personalColor].color}`}} className={styles.title}>{
                  color[user.personalColor].english
                }</span>
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
  )
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  color: state.color,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorResult);