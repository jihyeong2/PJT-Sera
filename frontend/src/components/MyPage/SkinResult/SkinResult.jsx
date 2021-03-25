import React from 'react';
import { Grid } from '@material-ui/core';
import SkinTypeInfo from '../../common/SkinTypeInfo/SkinTypeInfo';
import styles from './SkinResult.module.css';
const SkinResult = (props) => {
  const temp = [1,2,3,4]
  return(
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.skintype}>
          ONRT
        </div>
        <div className={styles.skintype_info}>
          <Grid className={styles.table} container spacing={5} style={{margin:'0'}}>
              {temp.map((item) => (
                <Grid key={item} item xs={6}>
                  <SkinTypeInfo key={item}/>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SkinResult;