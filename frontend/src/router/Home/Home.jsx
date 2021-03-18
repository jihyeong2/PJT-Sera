import React, { Component } from 'react';
import ProductList from '../../components/common/ProductList/ProductList';
class Home extends Component {
  render() {
    return (
      <div>
        <h1>home</h1>
        <ProductList/>
      </div>
    );
  }
}

export default Home;