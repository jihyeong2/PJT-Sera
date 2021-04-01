import React from 'react';
import styles from './personal_color.module.css';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import BeautyTip from '../../../components/common/BeautyTip/BeautyTip';
import Palette from '../../../components/common/Pallette/ColorPalette';
import userEvent from '@testing-library/user-event';
const PersonalColor = ({user, color}) => {

    return(
        <div className={styles.container}>
            <div className={styles.main_title}>
                <p>당신의 퍼스널 컬러는</p>
                <p><span style={{color:`${color[user.personalColor].color}`}} className={styles.test_result}>{user.personalColor}</span> 입니다.</p>
            </div>
            <div className={styles.box}>
                <Grid container spacing={4}>
                    <Grid item xs={4} >
                        <span style={{color:`${color[user.personalColor].color}`, opacity:'0.5', }}>
                            {color[user.personalColor].english.split(' ')[0]}
                            <br/>
                            {color[user.personalColor].english.split(' ')[1]}
                        </span>
                        
                    </Grid>
                    <Grid item xs={8} >
                        <div className={styles.text}>
                            <pre className={styles.des}>
                                부드럽고 친절한 이미지를 가지고 있어 주변인들의 <br/>
                                사랑을 많이 받는 사람입니다. <br/>
                                선명하고 맑은 캔디 컬러들이 잘 어울리며 <br/>
                                부드러운 곡선 디자인과 작은 꽃무늬를 추천합니다.
                            </pre>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={styles.tip}>
                <BeautyTip currTag={user.personalColor}/>
            </div>
            <div className={styles.place}>
                <Palette currTag={user.personalColor}/>
            </div>
        </div>
    );
} 
// 이게 퍼스널컬러js 가져오는 공식?

// mapStateToProps가 redux에 있는 state를 컴포넌트가 쓸수있는 props로 내려주는 애
const mapStateToProps = (state) => ({
    user: state.user.user,
    color: state.color, 
}) // 지형근데 이게 color.js 인지 어케알아? ? 저 두개가 유저랑 컬러를 쓴단말???
// 저렇게 하면 배치는 내가할게 불러오는거 보여줭
// 저렇게 user 랑 color를 불러오고 지금 
// mapDispatchToProps가 redux state 변경하려고 만들어놓은 함수 실행하는 애
// 근데 redux state 바꾸는건 필요없으니까 뺄게 주석해줘... 뭔주석  이말아님?
// const mapDispatchToProps = (dispatch) => ({
// })

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(PersonalColor);