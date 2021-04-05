import React from 'react';
import styles from './detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Detail = ({ product }) => {
    console.log(product);

    // const onHandleHeart = (item_id,idx) =>{
    //     if(!products[idx].dibs){ //좋아요
    //         setLike(
    //             user.userId,
    //             item_id,
    //             (res)=>{
    //                 const tmp = products.map(product=>{
    //                     if(product.item_id != item_id) return product;
    //                     else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1}
    //                 })
    //                 setProducts(tmp);
    //             },
    //             (err)=>{
    //                 console.error(err);
    //             }
    //         )
    //     } else{ //싫어요
    //         setHate(
    //             user.userId,
    //             item_id,
    //             (res)=>{
    //                 const tmp = products.map(product=>{
    //                     if(product.item_id != item_id) return product;
    //                     else return {...product, dibs: false, dibs_cnt: product.dibs_cnt-1}
    //                 })
    //                 setProducts(tmp);
    //             },
    //             (err)=>{
    //                 console.error(err);
    //             }
    //         )
    //     }
    // }

    return (
        <div className={styles.detail_left}>
                <div className={styles.wrap}>
                    <img className={styles.product_image} src={product.item_img} alt="Product Image"/>
                    {product.rating<0 && <div style={{backgroundColor:'#AF3131'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞지 않아요 👎🏻</span></div>}
                    {product.rating>0 && <div style={{backgroundColor:'#4E9157'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞아요 👍🏻</span></div>}
                    {product.rating==0 && <div style={{backgroundColor:'#FAC56A'}} className={styles.match}><span className={styles.match_name} >보통이에요 🤏🏻</span></div>}
                </div>

            <div className={styles.icon}>
                {product.dibs_cnt}&nbsp;
                {
                    product.dibs == false && (
                        <span className={styles.heart_icon}><FontAwesomeIcon icon={['far', 'heart']} size="lg" color="red" /></span>
                    )
                }
                {
                    product.dibs == true && (
                        <span className={styles.heart_icon}><FontAwesomeIcon icon={['fas', 'heart']} size="2x" color="red"/></span>
                    )
                }
            </div>
        </div>
    )

};

export default Detail;
