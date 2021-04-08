import React from 'react';
import styles from './ingredient.module.css';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {connect} from 'react-redux';

const Ingredient = ({user, product}) => {
    return(
        <div className={styles.modal_i}>
            <div className={styles.modal_img}>
                <img className={styles.modal_product_img} src={product.item_img} alt="상품사진"/>
            </div>
            <div className={styles.modal_content}>
            {product.rating<0 && <div style={{backgroundColor:'#AF3131'}} className={styles.modal_match}><span className={styles.modal_match_name} >나와 잘 맞지 않아요 👎🏻</span></div>}
                {product.rating>0 && <div style={{backgroundColor:'#4E9157'}} className={styles.modal_match}><span className={styles.modal_match_name} >나와 잘 맞아요 👍🏻</span></div>}
                {product.rating==0 && <div style={{backgroundColor:'#FAC56A'}} className={styles.modal_match}><span className={styles.modal_match_name} >보통이에요 🤏🏻</span></div>}
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
                        {
                            product.ingredient_elements.map ( element => ( 
                                <>
                                    <Grid item xs={6} >
                                    <div className={styles.in_detail} key={product.id}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={2} >
                                                <div className={styles.in_img}>
                                                    {
                                                        element.correct == 1 && ( // 일치 
                                                            <img className={styles.water_green_content} src={process.env.PUBLIC_URL + '/images/waterdrop_green.png'} alt="그린"/>
                                                        )
                                                    }
                                                    {
                                                        element.correct == 0 && ( // 그냥 성분 
                                                            <img className={styles.water_orange_content} src={process.env.PUBLIC_URL + '/images/waterdrop_orange.png'} alt="오렌지"/>
                                                        )
                                                    }
                                                    {
                                                        element.correct == -1 && ( // 불일치 
                                                            <img className={styles.water_red_content} src={process.env.PUBLIC_URL + '/images/waterdrop_red.png'} alt="빨강"/>
                                                        )
                                                    }
                                                </div>
                                            </Grid>
                                            <Grid item xs={10} >
                                                <div className={styles.in_content}>
                                                    <p className={styles.in_title}>{element.element_korean_name}</p>
                                                    <p className={styles.in_description}>{element.element_english_name} <br/> {element.element_purpose}</p>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className={styles.bar}></div>  
                                    </Grid>
                                </>
                            ))
                        }
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