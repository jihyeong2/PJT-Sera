import React from 'react';
import styles from './personal_color.module.css';
import Grid from '@material-ui/core/Grid';

const PersonalColor = (props) => {
    return(
        <div className={styles.container}>
            <div className={styles.main_title}>
                <p>당신의 퍼스널 컬러는</p>
                <p><span className={styles.test_result}>봄웜 </span> 입니다.</p>
            </div>
            <div className={styles.box}>
                <Grid container spacing={4}>
                    <Grid item xs={4} >
                    <img className={styles.color} src={process.env.PUBLIC_URL + '/images/spring.PNG'} alt="퍼스널 결과"/>
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
                <h2>나의 뷰티 팁 </h2>
            </div>
            <div className={styles.place}>
                <h2>나의 컬러 플레이스</h2>
            </div>
        </div>
    );
}

export default PersonalColor;