import React from 'react';
import styles from './detail.module.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Detail = ( ) => (
    <div className={styles.detail_right}>
            <p className={styles.product_category}>스킨케어 세럼</p>
            <p className={styles.product_name}>프로바이오틱스 세라마이드 크림</p> 
            <p><span className={styles.volume}>60ml /  </span><span className={styles.price}>35,000원</span></p>
            <div className={styles.brand}>
                <span className={styles.brand_name}>마몽드 (Mamonde)</span>
                <Button className={styles.naver_go_btn} variant="outlined">
                <img className={styles.naver_icon} src={process.env.PUBLIC_URL + '/images/naver_icon.png'} alt="네이버아이콘"/>
                최저가 검색</Button>
                <Button className={styles.brand_go_btn} variant="outlined">브랜드몰 가기</Button>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.match_detail}>
                <Grid container spacing={1}>
                        <Grid item xs={2} >
                            <div className={styles.circle_percent}>80%</div>
                        </Grid>
                        <Grid item xs={7} >
                            <div className={styles.result}>
                                <br></br>
                                <span className={styles.test_result}>ORNT</span>인
                                <span className={styles.nickname}> 지니</span>님과 성분이
                                <span className={styles.test_percent}> 80%</span> 일치합니다.
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <br></br>
                            <Button className={styles.ingredient_btn} variant="outlined">성분보기</Button>
                        </Grid>
                    </Grid>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.tone_detail}>
                <Grid container spacing={1}>
                    <Grid item xs={2} >
                        <div className={styles.tone_circle}>
                            <div>가을</div>
                            <div>웜</div>
                        </div>
                    </Grid>
                    <Grid item xs={7} >
                        <div className={styles.tone_result}>
                            <br></br>
                            <span className={styles.nickname}> 지니</span>님은 
                            <span className={styles.test_tone}> 가을웜톤</span> 입니다.
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <br></br>
                        <Button className={styles.tone_btn} variant="outlined">정보보기</Button>
                    </Grid>
                </Grid>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.detail}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <div className={styles.description_name}> 설명 </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className={styles.description_content}>
                            바를수록 건강해지는 유산균 발효용액 보습장벽 마일드 크림 <br />
                            - 플로랄 바이오틱스와 7겹 세라마이드의 촉촉 보습장벽 듀얼 이펙트 <br /> 
                            - 피부 속 보습은 촉촉하게 채우고 끈적임없이 가볍게 흡수 <br />
                            - 피부에 부담 없는 클린 마일드 포뮬라<br />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>           
);

export default Detail;