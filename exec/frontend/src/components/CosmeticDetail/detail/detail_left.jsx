import React, { useState } from 'react';
import styles from './detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux';
import http from '../../../http-django';

const Detail = ({ product, user }) => {

    const [heart, setHeart] = useState(product.dibs);
    const [cnt, setCnt] = useState(product.dibs_cnt);

    const heartAdd = () => {
        http.put(`v1/items/dibs/${user.userId}/${product.item_id}`)
        .then(res=>{     
            setHeart(true);
            setCnt(cnt+1);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    const heartDel = () => {
        http.delete(`v1/items/dibs/${user.userId}/${product.item_id}`)
        .then(res=>{     
            setHeart(false);
            setCnt(cnt-1);
        })
        .catch(err=>{
            console.error(err);
        })
    }

    return (
        <div className={styles.detail_left}>
                <div className={styles.wrap}>
                    <img className={styles.product_image} src={product.item_img} alt="Product Image"/>
                    {product.rating<0 && <div style={{backgroundColor:'#AF3131'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞지 않아요 👎🏻</span></div>}
                    {product.rating>0 && <div style={{backgroundColor:'#4E9157'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞아요 👍🏻</span></div>}
                    {product.rating==0 && <div style={{backgroundColor:'#FAC56A'}} className={styles.match}><span className={styles.match_name} >보통이에요 🤏🏻</span></div>}
                </div>

            <div className={styles.icon}>
                <span style={{fontSize:"20px"}}> {cnt}&nbsp;</span>
                {
                    heart == false && (
                        <span className={styles.heart_icon}><FontAwesomeIcon icon={['far', 'heart']} size="2x" color="red" onClick={heartAdd} /></span>
                    )
                }
                {
                    heart == true && (
                        <span className={styles.heart_icon}><FontAwesomeIcon icon={['fas', 'heart']} size="2x" color="red" onClick={heartDel} /></span>
                    )
                }
            </div>
        </div>
    )

};

// export default Detail;
const mapStateToProps = (state) => ({
    user: state.user.user,
  })
  export default connect(
    mapStateToProps,
  )(Detail);
