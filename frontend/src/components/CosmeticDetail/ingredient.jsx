import React from 'react';
import styles from './ingredient.module.css';
import Grid from '@material-ui/core/Grid';
import IngredientItem from './ingredient_item';

const Ingredient = (props) => {
    return(
        <div className={styles.modal_i}>
            <div className={styles.modal_img}>
                <img className={styles.modal_product_img} src={process.env.PUBLIC_URL + '/images/product_Sample.PNG'} alt="상품사진"/>
            </div>
            <div className={styles.modal_content}>
                <div className={styles.modal_match}><span className={styles.modal_match_name} >일치율 </span><span className={styles.modal_match_percent}>80%</span></div> 
                <p className={styles.modal_product_category}>스킨케어 세럼</p>
                <p className={styles.modal_product_name}>프로바이오틱스 세라마이드 크림</p> 
                <p><span className={styles.modal_volume}>60ml /  </span><span className={styles.modal_price}>35,000원</span></p>
            </div>
            <div className={styles.divs}>
                <span className={styles.des}>해당 제품의 전 성분에 대한 <span className={styles.nick}> 지니 </span> 고객님의 일치여부 입니다. </span> 
                <div className={styles.drops}>
                    <div className={styles.water_img}>
                        <img className={styles.water_green} src={process.env.PUBLIC_URL + '/images/waterdrop_green.png'} alt="그린"/>
                        <img className={styles.water_red} src={process.env.PUBLIC_URL + '/images/waterdrop_red.png'} alt="레드"/>
                    </div>
                    <div className={styles.water_content}>
                        <span className={styles.best}>BEST</span>
                        <span className={styles.worst}>WORST</span>
                    </div>
                </div>
            </div>
            
            <div className={styles.ingredients}>
            <Grid container spacing={6}>
                    <Grid item xs={6} >
                        <IngredientItem />
                    </Grid>
                    <Grid item xs={6} >
                        <IngredientItem />
                    </Grid>
                </Grid>
                <Grid container spacing={6}>
                    <Grid item xs={6} >
                        <IngredientItem />
                    </Grid>
                    <Grid item xs={6} >
                        <IngredientItem />
                    </Grid>
                </Grid>
                <Grid container spacing={6}>
                    <Grid item xs={6} >
                        <IngredientItem />
                    </Grid>
                    <Grid item xs={6} >
                        <IngredientItem />
                    </Grid>
                </Grid>
            </div>
        </div>                                 
    );
}

export default Ingredient;