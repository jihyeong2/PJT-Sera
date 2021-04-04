import React from 'react';
import styles from './detail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Detail = () => (
    <div className={styles.detail_left}>
        <div className={styles.wrap}>
            <img className={styles.product_image} src={process.env.PUBLIC_URL + '/images/product_Sample.PNG'} alt="상품사진" />
            <div className={styles.match}><span className={styles.match_name} >일치율 </span><span className={styles.match_percent}>80%</span></div>
        </div>

        <div className={styles.icon}>
            231<span className={styles.heart_icon}><FontAwesomeIcon icon={['far', 'heart']} size="lg" color="red" /></span>
            {/* <FontAwesomeIcon icon={['fas', 'heart']} size="2x" color="red"/> */}
            <div className={styles.share_icon}><FontAwesomeIcon icon="share-alt" size="lg" color="gray" /></div>
        </div>
    </div>
);

export default Detail;
