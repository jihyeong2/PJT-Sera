import React from 'react';
import styles from './ingredient.module.css';
import Grid from '@material-ui/core/Grid';
import IngredientItem from './ingredient_item';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {connect} from 'react-redux';

const Ingredient = ({user, product}) => {
    console.log(product);
    return(
        <div className={styles.modal_i}>
            <div className={styles.modal_img}>
                <img className={styles.modal_product_img} src={product.item_img} alt="상품사진"/>
            </div>
            <div className={styles.modal_content}>
                <div className={styles.modal_match}><span className={styles.modal_match_name} >나랑 맞지 않아요 👎🏻</span></div> 
                <p className={styles.modal_product_category}>{product.category_large}
            <ArrowForwardIosIcon fontSize="small" /> {product.category_middle} </p>
                <p className={styles.modal_product_name}>{product.item_name}</p> 
                <p><span className={styles.modal_volume}>{product.item_volume} /  </span><span className={styles.modal_price}>{product.item_price}</span></p>
            </div>
            <div className={styles.divs}>
                <span className={styles.des}>해당 제품의 전 성분에 대한 <span className={styles.nick}> {user.userNickname} </span> 고객님의 일치여부 입니다. </span> 
                <div className={styles.drops}>
                    <div className={styles.water_img}>
                        <img className={styles.water_green} src={process.env.PUBLIC_URL + '/images/waterdrop_green.png'} alt="그린"/>
                        <img className={styles.water_red} src={process.env.PUBLIC_URL + '/images/waterdrop_red.png'} alt="레드"/>
                        <img className={styles.water_orange} src={process.env.PUBLIC_URL + '/images/waterdrop_orange.png'} alt="오렌지"/>
                    </div>
                    <div className={styles.water_content}>
                        <span className={styles.best}>BEST</span>
                        <span className={styles.worst}>WORST</span>
                        <span className={styles.ing}>ELEMENT</span>
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

// export default Ingredient;
const mapStateToProps = (state) => ({
    user: state.user.user,
  })
  export default connect(
    mapStateToProps,
  )(Ingredient);