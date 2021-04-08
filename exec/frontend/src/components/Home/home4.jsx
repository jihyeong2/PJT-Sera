import { Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import styles from './home4.module.css';
import {connect} from 'react-redux';
import BeautyTip from '../common/BeautyTip/BeautyTip';
import ColorPalette from '../common/Pallette/ColorPalette';
const Home4 = ({color}) => {
  const [currTag,setCurrTag] = useState('봄웜');
  let tagStyle = {
    color: color[currTag].color,
    border: `1px solid ${color[currTag].color}`,
    borderRadius:'4em'
  }
  const onMouseOver = (e) => {
    setCurrTag(e.target.innerText)
  };
  return(
    <div className={styles.container}>
      <Grid container spacing={5}>
        <Grid item xs={5}>
          <Grid
            container
            direction="column"
          >
          <div className={styles.text_box}>
            <div className={styles.title}>
              나는 웜톤일까? 쿨톤일까?<br/>
              퍼스널컬러 진단
            </div>
            <div className={styles.content}>
              새라는 사용자의 사진을 분석하여<br/>
              퍼스널 컬러를 알려드립니다.
            </div>
          </div>
          </Grid>
          <Grid container style={{marginTop:'5em'}}>
            {Object.keys(color).map(item=>{
              return(
                <Grid key={item} item xs={3}>
                  <div
                    className={styles.tone_tag}
                    style={item===currTag ? tagStyle : {}}
                    onMouseOver={onMouseOver}
                  >
                    {item}
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <div className={styles.color_title}>
            <span style={{color:color[currTag].color}}>{currTag}</span>&nbsp;
            <span style={{color:color[currTag].color, opacity:'0.4'}}>{color[currTag].english}</span>
          </div>
          <BeautyTip currTag={currTag}/><br/>
          <ColorPalette currTag={currTag}/>
        </Grid>
      </Grid>
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
)(Home4)