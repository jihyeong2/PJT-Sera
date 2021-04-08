import { Grid } from '@material-ui/core';
import React, { useState } from 'react';

import styles from './ProductList.module.css';
import Product from './Product';
const ProductList = ({products, handleHeart,handleHeart2,productsKey2}) => {
  const onHandleHeart = (item_id,idx) => {
    handleHeart(item_id,idx);
  };
  const onHandleHeart2 = (productsKey2,item_idx,idx) => {
    handleHeart2(productsKey2,item_idx,idx);
  };
  return (
    <Grid className={styles.products} container spacing={5}>
        {products.map((product,idx) => (
          <Grid key={product.item_id} item xs={3} className={styles.product}>
              <Product index={idx} productsKey2={productsKey2} product={product} handleHeart={onHandleHeart} handleHeart2={onHandleHeart2}/>
          </Grid>
        ))}
    </Grid>
  )
};

export default ProductList;