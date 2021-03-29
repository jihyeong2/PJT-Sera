import React from 'react';
import styles from './SkinHexagonInfo.module.css';
import {connect} from 'react-redux';
const SkinHexagonInfo = ({skin,currTag}) => {
  return (
    <>
      <div className={styles.skintype} style={{color:`${skin.type[currTag].color}`}}>
        {currTag}
      </div>
      <div className={styles.skintype_info}>
      {skin.type[currTag].tag.map((item,idx) =>{
        return(
          <div key={item} style={{borderBottom:'1px solid #CCCCCC', paddingBottom:'0.5em'}}>
            <div  className={styles.title}>
              <span style={{color:`${skin.type[currTag].color}`}}>{item.slice(0,1)}</span>
              {item.slice(1,)}
            </div>
            <div className={styles.content}>
              {skin.type_info[item]}
            </div>
          </div>
        )
      })}
      </div>
    </>
  );
};


const mapStateToProps = (state) => ({
  skin: state.skin,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkinHexagonInfo)