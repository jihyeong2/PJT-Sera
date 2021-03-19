import React from 'react';
import styles from './ingredient.module.css';
import Grid from '@material-ui/core/Grid';

const IngredientItem = (props) => {
    return(
        <>
            <div className={styles.in_detail}>
                            <Grid container spacing={2}>
                                <Grid item xs={2} >
                                    <div className={styles.in_img}>
                                        <img className={styles.water_green_content} src={process.env.PUBLIC_URL + '/images/waterdrop_green.png'} alt="그린"/>
                                    </div>
                                </Grid>
                                <Grid item xs={10} >
                                    <div className={styles.in_content}>
                                        <p className={styles.in_title}>로즈마리잎추출물</p>
                                        <p className={styles.in_description}>Rosmarinus Officinalis (Rosemary) Leaf Extract 산화방지제, 향료, 피부컨디셔닝제, 수분증발차단제</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={styles.bar}></div>
        </>
    )
}

export default IngredientItem;