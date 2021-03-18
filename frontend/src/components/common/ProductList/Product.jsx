import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './Product.module.css';

const Product = ({product}) => {
  return (
    <div className={styles.box}>
      <div className={styles.icon}>
        <FontAwesomeIcon icon="heart" size="sm" color="#EB0000"/>
      </div>
      <div className={styles.image_box}>
        <img className={styles.image} src={product.image} alt="Product Image"/>
      </div>
      <div className={styles.brand}>{product.brand}</div>
      <div className={styles.name}>{product.name}</div>
      <div className={styles.volume_price}>{product.volume} / {product.price}</div>
    </div>
  );
};

export default Product;
Product.propTypes = {
  product: PropTypes.object
}