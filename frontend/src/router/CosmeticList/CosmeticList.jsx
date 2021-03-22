import React, { Component } from 'react';
import Logo from '../../components/common/Logo/Logo';
import ProductList from '../../components/common/ProductList/ProductList';
import ProductNav from '../../components/CosmeticList/product_nav';
import styles from './CosmeticList.module.css'

class CosmeticList extends Component {
  render() {
    return (
      <div className={styles.containar}>
        <Logo type={1}/>
        <ProductNav />
        <ProductList />
      </div>
    );
  }
}

export default CosmeticList;