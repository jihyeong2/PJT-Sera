import React, {useState} from 'react';
import styles from './MyPick.module.css';
import ProductList from '../../components/common/ProductList/ProductList';
import data from '../../data/GP_items_1-10000.json';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import {connect} from 'react-redux';

const MyPick = ({user}) => {
  const [products,setProducts]=useState(data.slice(0,8));
  return (
    <div className={styles.container}>
      <Navbar/>
      <Logo type={1} className={styles.logo}/>
      <div className={styles.header}>
        나의 찜목록
      </div>
      <div className={styles.guide}>
        <span className={styles.highlight}>{user.nickName}</span>
        <span>님이 찜한 개수는 </span>
        <span className={styles.highlight}>{products.length}</span>
        <span> 개 입니다.</span>
        
      </div>
      <ProductList products={products}/>
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