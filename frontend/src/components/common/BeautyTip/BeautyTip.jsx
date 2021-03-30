import React from 'react';
import styles from './BeautyTip.module.css';
import hairIcon from '../../../assets/hair_icon.png';
import faceIcon from '../../../assets/face_icon.png';
import necklaceIcon from '../../../assets/necklace_icon.png';
import eyeIcon from '../../../assets/eye_icon.png';
import paletteIcon from '../../../assets/palette_icon.png';
import {connect} from 'react-redux';
import { Grid } from '@material-ui/core';

const BeautyTip = ({currTag,color}) => {
  return(
    <Grid container spacing={1} style={{margin:'0'}}>
      <Grid item xs={6}>
        <img className={styles.image} src={hairIcon} alt="" align="center"/>
        <span className={styles.title}>피부색</span>
      </Grid>
      <Grid item xs={6}><span className={styles.content}>{color[currTag].skin}</span></Grid>
      <Grid item xs={6}>
        <img className={styles.image} src={faceIcon} alt="" align="center"/>
        <span className={styles.title}>머리색</span>
      </Grid>
      <Grid item xs={6}><span className={styles.content}>{color[currTag].hair}</span></Grid>
      <Grid item xs={6}>
        <img className={styles.image} src={eyeIcon} alt="" align="center"/>
        <span className={styles.title}>눈동자 테두리색</span>
      </Grid>
      <Grid item xs={6}><span className={styles.content}>{color[currTag].eyes}</span></Grid>
      <Grid item xs={6}>
        <img className={styles.image} src={necklaceIcon} alt="" align="center"/>
        <span className={styles.title}>액세서리</span>
      </Grid>
      <Grid item xs={6}><span className={styles.content}>{color[currTag].accessory}</span></Grid>
      <Grid item xs={6}>
        <img className={styles.image} src={paletteIcon} alt="" align="center"/>
        <span className={styles.title}>어울리는 색</span>
      </Grid>
      <Grid item xs={6}><span className={styles.content}>{color[currTag].fit_color}</span></Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  color: state.color,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeautyTip)