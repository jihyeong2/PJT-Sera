import axios from 'axios';
import React, { Component, useEffect } from 'react';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import RecentList from '../../components/common/RecentList/recent_list';
// import ProductList from '../../components/common/ProductList/ProductList';
import ProductNav from '../../components/CosmeticList/product_nav';
import styles from './CosmeticList.module.css'
const CosmeticList = (props) => {
  // const [products, setProducts] = ustState([]);
  // useEffect(()=>{
  //   처음에 페이지가 렌더링 될 때 api를 요청해서 모든 데이터를 다 받아온다고 ㅊ이면
  //   axios.뭐시기해서
  //   .then(res){
  //     setProducts(res.data) 이렇게 해서 모든데이터가 저기 다 들어있다고 치면
  //   }
  // })
  return (
    <div className={styles.containar}>
      <Navbar/>
      <Logo type={1}/>
      <ProductNav />
      {/* <ProductList 	products={products}/>
      이렇게 그냥 내려주면 돼
      그러면ProductList는 products라는 이름으로 내려준 데이터 쓸수있어 */}
      <RecentList />
    </div>
  );
} 
// 백요청이 먼저였어??,,,임의로 보여지는줄..그 폼이
// 백요청이 먼저였어?? 백에서 데이터를 안가져오고 그냥 저거 리스트 
// 넣으니까map오류났자나 
// 어떻게 내려줬었는데? 아니 안내려주면 저 폼이 그냥 보이는줄알았어
// 아아 공통컴포넌트여서 무조건 내려받은 데이터에서 보여지도록 해놨어아아 이해했어.. 땡큐해볼겡!! ㅃ
// 여기가 상품보여지는 페이지잖아웅
// 그러면 여기서 그 데이터를 api로 투컴다보임???너무커좋아
// 무튼 여기서 api로 데이터를 가져와서 ProductList로 내려주면돼
// ProductNav클릭에 따라서 보여지는 데이터가 달라지잖아
// 아니 뭐래 뭘=ㅁㅎㅇ노ㅓㅑㅐㅔㄱ 3ㅗ배ㅓ;하ㅠㄻ
// 그니까 
export default CosmeticList;