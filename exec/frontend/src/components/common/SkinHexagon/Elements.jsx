import React from 'react';
import styles from './Elements.module.css';
import {connect} from 'react-redux';
import { Grid } from '@material-ui/core';
import dropGreen from '../../../assets/waterdrop_green.png';
import dropRed from '../../../assets/waterdrop_red.png';
const Elements = ({skin,currTag}) => {
  return(
    <div className={styles.container}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className={styles.title}>
            도움성분
          </div>
          <div className={styles.content}>
            <Grid container justify="center" spacing={1}>
              {skin.type[currTag].good.slice(0,3).map(item=>{
                return(
                  <Grid key={`${item}green`} item xs={4}>
                    <img className={styles.img} src={dropGreen} alt=""/>
                    <div className={styles.element}>{item}</div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={styles.title}>
            유해성분
          </div>
          <div className={styles.content}>
            <Grid container justify="center" spacing={1}>
              {skin.type[currTag].bad.slice(0,3).map(item=>{
                return(
                  <Grid key={`${item}red`} item xs={4}>
                    <img className={styles.img} src={dropRed} alt=""/>
                    <div className={styles.element}>{item}</div>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => ({
  skin: state.skin,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Elements)