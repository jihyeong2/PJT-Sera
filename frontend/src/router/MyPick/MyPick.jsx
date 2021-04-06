import React, {useEffect, useState} from 'react';
import styles from './MyPick.module.css';
import ProductList from '../../components/common/ProductList/ProductList';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import {connect} from 'react-redux';
import {getLikeList,setHate} from '../../service/product';
import Footer from '../../components/common/Footer/Footer';
import TopButton from '../../components/common/Button/TopButton/TopButton';
import Loader from '../../components/common/Loader/Loader';

const MyPick = ({user}) => {
  const [products,setProducts]= useState([]);
  const [productsIdx,setProductsIdx] = useState(12);
  const [isScroll,setIsScroll] = useState(false);
  const [isLoading,setIsLoading] = useState(true);
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
  const ScrollEvent =()=>{
    if(window.scrollY>0){
      setIsScroll(true);
    } else{
      setIsScroll(false);
    }
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight + 2 >= scrollHeight){
      const tmp=productsIdx+12;
      setProductsIdx(tmp);
    }
  }   
  useEffect(()=>{
    window.addEventListener('scroll', ScrollEvent);
    if(products.length===0){
      getLikeList(
        user.userId,
        (res)=>{
          setProducts(res.data.item_list);
          setIsLoading(false);
        },
        (err)=>{
          console.error(err);
          setIsLoading(false);
        }
      )
    }
    return () => {
      window.removeEventListener('scroll', ScrollEvent);
    }
  },[productsIdx]);
  const onClickTopButton = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };    
  return (
    <div style={{position:'relative', paddingBottom:'180px', minHeight:"100vh"}}>
      <Loader open={isLoading}/>
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
        <ProductList products={products.slice(0,productsIdx)} handleHeart={onHandleHeart}/>
      </div>
      {
        isScroll && <TopButton onClick={onClickTopButton}/>
      }
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