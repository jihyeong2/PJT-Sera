import React from 'react';
import { Grid } from '@material-ui/core';
import SkinTypeInfo from '../../common/SkinTypeInfo/SkinTypeInfo';
import styles from './SkinResult.module.css';
import {connect} from 'react-redux';
const SkinResult = ({user,skin}) => {
  return(
    <>
      {user.skinId && 
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.skintype} style={{border:`2px solid ${skin.type[user.skinId.skinType].color}`,color:`${skin.type[user.skinId.skinType].color}`}}>
              {user.skinId.skinType}
            </div>
            <div className={styles.skintype_info}>
              <Grid className={styles.table} container spacing={5} style={{margin:'0'}}>
                  {skin.type[user.skinId.skinType].tag.map((tag) => (
                    <Grid key={tag} item xs={6}>
                      <SkinTypeInfo title={tag} content={skin.type_info[tag]} color={skin.type[user.skinId.skinType].color}/>
                    </Grid>
                  ))}
              </Grid>
            </div>
          </div>
        </div>
      }
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  skin: state.skin,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkinResult);