import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Product.module.css';
import {connect} from 'react-redux';
import { useHistory } from 'react-router';
const Product = ({user,product, handleHeart, index}) => {
  const history = useHistory();
  const onClickHeart = () => {
    handleHeart(product.item_id, index);
  };
  const onClickProduct = () => {
    history.push(`/detail/${product.item_id}`);
  };
  return (
    <div className={styles.box}>
      <div className={styles.icon}>
        <button style={{border:'none', background:'transparent'}} onClick={onClickHeart}>
          {
            product.dibs ?
            <FontAwesomeIcon icon={['fas', 'heart']} size="sm" color="#EB0000"/> :
            <FontAwesomeIcon icon={['far', 'heart']} size="sm" color="#EB0000"/>
          }
        </button>
      </div>
      <div style={{cursor:'pointer'}} onClick={onClickProduct}>
        <div className={styles.image_box}>
          <img className={styles.image} src={product.item_img} alt="Product Image"/>
          {product.rating<0 && <div style={{backgroundColor:'#AF3131'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞지 않아요 👎🏻</span></div>}
          {product.rating>0 && <div style={{backgroundColor:'#4E9157'}} className={styles.match}><span className={styles.match_name} >나와 잘 맞아요 👍🏻</span></div>}
          {product.rating==0 && <div style={{backgroundColor:'#FAC56A'}} className={styles.match}><span className={styles.match_name} >보통이에요 🤏🏻</span></div>}
        </div>
        <div className={styles.brand}>{product.item_brand}</div>
        <div className={styles.name}>{product.item_name}</div>
        <div className={styles.volume_price}>{product.item_volume} / {product.item_price}</div>
      </div>

    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object
}
const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(
  mapStateToProps,
)(Product);