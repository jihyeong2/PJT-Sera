import React from 'react';
import styles from './ColorPalette.module.css';
import { Grid } from '@material-ui/core';
import {connect} from 'react-redux';

const ColorPalette = ({currTag,color}) => {
  console.log(color[currTag].palette);
  return(
    <div className={styles.container}>
      <div className={styles.palette}>
        {color[currTag].palette.slice(0,6).map(item=>{
          return(
            <div key={item} className={styles.color} style={{backgroundColor:`${item}`}}></div>
          );
        })}
      </div>
      <div className={styles.palette}>
        {color[currTag].palette.slice(6,12).map(item=>{
          return(
            <div key={item} className={styles.color} style={{backgroundColor:`${item}`}}></div>
          );
        })}
      </div>
      <div className={styles.palette}>
        {color[currTag].palette.slice(12,18).map(item=>{
          return(
            <div key={item} className={styles.color} style={{backgroundColor:`${item}`}}></div>
          );
        })}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  color: state.color,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorPalette)