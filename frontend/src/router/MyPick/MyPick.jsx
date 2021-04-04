import React, {useEffect, useState} from 'react';
import styles from './MyPick.module.css';
import ProductList from '../../components/common/ProductList/ProductList';
import data from '../../data/GP_items_1-10000.json';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import {connect} from 'react-redux';
import {getLikeList,setHate} from '../../service/product';
import Footer from '../../components/common/Footer/Footer';
const MyPick = ({user}) => {
  const [products,setProducts]= useState([]);
  const onHandleHeart = (item_id,idx) => {
    setHate(
      user.userId,
      item_id,
      (res)=>{
        const tmp = products.filter(product=>product.item_id!==item_id);
        setProducts(tmp);
      },
      (err)=>{
        console.error(err);
      }
    )
  };
  useEffect(()=>{
    getLikeList(
      user.userId,
      (res)=>{
        console.log(res.data);
        setProducts(res.data.item_list);
      },
      (err)=>{
        console.error(err);
      }
    )
  },[]);
  return (
    <div style={{position:'relative', paddingBottom:'180px', minHeight:"100vh"}}>
      <div className={styles.container}>
        <Navbar/>
        <Logo type={1} className={styles.logo}/>
        <div className={styles.header}>
          나의 찜목록
        </div>
        <div className={styles.guide}>
          <span className={styles.highlight}>{user.userNickname}</span>
          <span>님이 찜한 개수는 </span>
          <span className={styles.highlight}>{products.length}</span>
          <span> 개 입니다.</span>
          
        </div>
        <ProductList products={products} handleHeart={onHandleHeart}/>
      </div>
      <Footer/>
    </div>

  );
}
const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPick)