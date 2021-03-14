import React from 'react';
import styles from './detail.module.css';
import '../../common/style.css'
import Button from '@material-ui/core/Button';

const Detail = ( ) => (
    <div className={styles.detail_right}>
            <p className={styles.product_category}>스킨케어 - 세럼</p>
            <p className={styles.product_name}>프로바이오틱스 세라마이드 크림</p> 
            <p><span className={styles.volume}>60ml</span>/<span className={styles.price}>35,000원</span></p>
            <div className={styles.brand}>
                <span className={styles.brand_name}>마몽드</span>
                <Button className={styles.brand_go_btn} variant="outlined">브랜드몰 가기</Button>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.match_detail}>
                <div className={styles.circle_percent}>80%</div>
                <p className={styles.result}>
                    <span className={styles.test_result}>ORNT</span>인
                    <span className={styles.nickname}>지니</span>님과 성분이
                    <span className={styles.test_percent}>80%</span> 일치합니다.
                    <Button className={styles.ingredient_btn} variant="outlined">성분보기</Button>
                </p>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.detail}>
                <div></div>
            </div>
        </div>           
);

export default Detail;