import React, { useEffect, useState } from 'react';
import styles from './SkinHexagon.module.css';
import { Grid } from '@material-ui/core';
import './a.css';
import {connect} from 'react-redux';
// import {getSkinType} from '../../../actions/index';
const SkinHexagon = ({skin,onChangeTag, onChangeTag2}) => {
  const onMouseOver = (e) =>{
    onChangeTag && onChangeTag(e.target.innerText);
  }
  const onClick = (e) =>{
    onChangeTag2 && onChangeTag2(e.target.innerText);
  }
  return(
    <div>
      <ul id="hexGrid">
        {Object.keys(skin.type).slice(0,6).map(title=>{
          return(
            <li key={title} className="hex" onMouseOver={onMouseOver} onClick={onClick}>
              <div className="hexIn">
                <a className="hexLink" href="#">
                  <div className='img' style={{backgroundColor:`${skin.type[title].color}`}}>{title}</div>
                </a>
              </div>
            </li>
          )
        })}
        <li className="hex" onMouseOver={onMouseOver} onClick={onClick}>
          <div className="hexIn">
            <a className="hexLink" href="#">
              <div className='img' style={{backgroundColor:`${skin.type['OSNW'].color}`}}>OSNW</div>
            </a>
          </div>
        </li>
        <li className="hex" onMouseOver={onMouseOver} onClick={onClick}>
          <div className="hexIn">
            <a className="hexLink" href="#">
              <div className='img' style={{backgroundColor:`${skin.type['OSPW'].color}`}}>OSPW</div>
            </a>
          </div>
        </li>
        <li className="hex">
          <div className="hexIn">
            <a className="hexLink" href="#">
              <div className='img' style={{backgroundColor:'#FFFFFF', color:'#000000'}}><span className={styles.logo}>SERA</span></div>
            </a>
          </div>
        </li>
        <li className="hex" onMouseOver={onMouseOver} onClick={onClick}>
          <div className="hexIn">
            <a className="hexLink" href="#">
              <div className='img' style={{backgroundColor:`${skin.type['DSNW'].color}`}}>DSNW</div>
            </a>
          </div>
        </li>
        <li className="hex" onMouseOver={onMouseOver} onClick={onClick}>
          <div className="hexIn">
            <a className="hexLink" href="#">
              <div className='img' style={{backgroundColor:`${skin.type['DRPW'].color}`}}>DRPW</div>
            </a>
          </div>
        </li>
        <li className="hex">
          <div className="hexIn">
            <a className="hexLink" href="#">
              <div className='img' style={{backgroundColor:'#FFFFFF'}}></div>
            </a>
          </div>
        </li>        
        {Object.keys(skin.type).slice(10,).map(title=>{
          return(
            <li key={title} className="hex" onMouseOver={onMouseOver} onClick={onClick}>
              <div className="hexIn">
                <a className="hexLink" href="#">
                  <div className='img' style={{backgroundColor:`${skin.type[title].color}`}}>{title}</div>
                </a>
              </div>
            </li>
          )
        })}        
      </ul>
    </div>
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
)(SkinHexagon)