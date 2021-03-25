import React from 'react';
import styles from './ColorPalette.module.css';
import { Grid } from '@material-ui/core';

const ColorPalette = (props) => {
  const a=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
  return(
    <Grid container spacing={1} style={{margin:'0'}}>
      {
        a.map(item=>(
          <Grid key={item} item xs={2}>
            <div key={item} className={styles.color}></div>
          </Grid>
        ))
      }

    </Grid>
  )
};

export default ColorPalette;