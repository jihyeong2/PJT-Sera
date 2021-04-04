import React from 'react';
import styles from './personal_color.module.css';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import BeautyTip from '../../../components/common/BeautyTip/BeautyTip';
import Palette from '../../../components/common/Pallette/ColorPalette';
import userEvent from '@testing-library/user-event';
const PersonalColor = ({user, color}) => {
    console.log(user);
    console.log(color);
    return(
        <div className={styles.container}>
            <div className={styles.main_title}>
                <p className={styles.you}>당신의 퍼스널 컬러는</p>
                <p className={styles.you2}><span style={{color:`${color[user.personalColor].color}`}} className={styles.test_result}>{user.personalColor}</span> 입니다.</p>
            </div>
            <div className={styles.box}>
                <Grid container spacing={4}>
                    <Grid item xs={4} >
                        <div style={{color:`${color[user.personalColor].color}`}} className={styles.color}>
                            {color[user.personalColor].english.split(' ')[0]}
                            <br/>
                            {color[user.personalColor].english.split(' ')[1]}
                        </div>
                        
                    </Grid>
                    <Grid item xs={8} >
                        <div className={styles.text}>
                            <pre className={styles.des}>
                                {color[user.personalColor].desc}
                            </pre>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={styles.tip}>
            <div className={styles.titles}><div className={styles.boxs}></div> <span>나의 뷰티 Tip</span> </div>
                <BeautyTip currTag={user.personalColor}/>
            </div>
            <br/>
            <div className={styles.place}>
                <div className={styles.titles}><div className={styles.boxs}></div> <span>나의 컬러플레이스</span> </div>
                <Palette currTag={user.personalColor}/>
            </div>
        </div>
    );
} 
// mapStateToProps가 redux에 있는 state를 컴포넌트가 쓸수있는 props로 내려주는 애
const mapStateToProps = (state) => ({
    user: state.user.user,
    color: state.color, 
}) 
export default connect(
    mapStateToProps,
)(PersonalColor);