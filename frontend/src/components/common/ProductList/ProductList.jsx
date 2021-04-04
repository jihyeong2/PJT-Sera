import { Grid } from '@material-ui/core';
import React, { useState } from 'react';

import styles from './ProductList.module.css';
import Product from './Product';
const ProductList = ({products}) => {
  
  return (
    <Grid className={styles.products} container spacing={5}>
        {products.map((product) => (
          <Grid key={product.item_id} item xs={3} className={styles.product}>
              <Product key={product.item_id} product={product}/>
          </Grid>
        ))}
    </Grid>
  )
};

export default ProductList;