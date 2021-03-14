import React from 'react';
import DetailLeft from '../../components/CosmeticDetail/detail_left';
import DetailRight from '../../components/CosmeticDetail/detail_right';
import Youtube from '../../components/CosmeticDetail/youtube';
import Review from '../../components/CosmeticDetail/review';
import styles from './CosmeticDetail.module.css'
import Grid from '@material-ui/core/Grid';

const CosmeticDetail = ( ) => {
    return (
        <div className={styles.page}>
            <Grid container spacing={4}>
            <Grid item xs={4} className={styles.detail}>
                <DetailLeft />
            </Grid>
            <Grid item xs={8} className={styles.detail}>
                <DetailRight />
            </Grid>
            <Grid item xs={12} className={styles.youtube}>
                <Youtube />
            </Grid>
            <Grid item xs={12} className={styles.review}>
                <Review />
            </Grid>
            </Grid>
        </div>
    );
};

export default CosmeticDetail;