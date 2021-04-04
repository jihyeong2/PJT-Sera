import axios from 'axios';
import React, { Component, useEffect, useState } from 'react';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import RecentList from '../../components/common/RecentList/recent_list';
import ProductList from '../../components/common/ProductList/ProductList';
import ProductNav from '../../components/CosmeticList/product_nav';
import styles from './CosmeticList.module.css'
import {connect} from 'react-redux';

const CosmeticList = ({user}) => {
  console.log(user);
  const [products, setProducts] = useState([]);

  const getList = () => {
    
    // axios
    //       .get(`http://localhost:8888/v1/items/recom/${user.userId}`)
    //       .then((res) => {
    //         console.log("데이터"+res.data);
    //         setProducts(res.data);
    //       })
    //       .catch((err) => {
    //           console.error("에러!"+err);
    //       });
  }

  useEffect(()=>{
      getList();
    }
  )

  return (
      <div className={styles.containar}>
      <Navbar/>
      <Logo type={1}/>
      <React.StrictMode>
      <ProductNav />
      </React.StrictMode>
      
      {/* <ProductList 	products={products}/>
      이렇게 그냥 내려주면 돼
      그러면ProductList는 products라는 이름으로 내려준 데이터 쓸수있어 */}
      <RecentList />
    </div>
    
  );
} 

// export default CosmeticList;
const mapStateToProps = (state) => ({
  user: state.user.user,
})
export default connect(
  mapStateToProps,
)(CosmeticList);