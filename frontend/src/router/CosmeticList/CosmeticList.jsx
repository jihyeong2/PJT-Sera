import React, { Component, useEffect, useState, useCallback } from 'react';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import ProductNav from '../../components/CosmeticList/product_nav';
import styles from './CosmeticList.module.css'
import TopButton from  '../../components/common/Button/TopButton/TopButton';
import Footer from '../../components/common/Footer/Footer';
import {connect} from 'react-redux';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const CosmeticList = ({user}) => {
  console.log(user);
  let history = useHistory();
  // 로그인 안한거 막기
  if(user == null){
    Swal.fire({
      icon: 'error',
      text: '로그인 후 이용해주세요',
      confirmButtonText: '확인',
    }).then(() => {
      history.push("/login");
    })
  }
  // 피부타입 없을 때 진단으로 
  else if(user.skinId == null){
    Swal.fire({
      icon: 'error',
      text: '피부진단 후 이용해주세요',
      confirmButtonText: '진단하기',
    }).then(() => {
      history.push("/skin/");
    })
  }

  // 필수정보 없을 때 마이페이지로 
  else if(user.userAge == '' || user.userGender == '' || user.userNickname == '' || user.userPassword == '' || user.userPhone == ''){
    Swal.fire({
      icon: 'error',
      text: '필수정보를 채운 후 이용해주세요',
      confirmButtonText: '확인',
    }).then(() => {
      history.push("/mypage");
    })
  }
  


  const [isScroll,setIsScroll] = useState(false);
  const scrollEvent = useCallback(()=>{
    if(window.scrollY>0)  setIsScroll(true);
    else setIsScroll(false);
  });    

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent, true);
    return () =>{
      window.removeEventListener('scroll', scrollEvent, true);
    }
  }, []); // 마운트가 되었을 때만 호출

  const onClickTopButton = () => {
    window.scroll({
      top:0,
      left:0,
      behavior:'smooth',
    })
  }
  return (
    <div style={{position:'relative', paddingBottom:'180px', minHeight:'100vh'}}>
      <div className={styles.containar}>
          <Navbar/>
          <Logo type={1}/>
          <React.StrictMode>
            <ProductNav />
          </React.StrictMode>
      </div>
        {
          isScroll && <TopButton onClick={onClickTopButton}/>
        }
        <Footer/>
      </div>
  );
} 

// export default CosmeticList;
const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(
  mapStateToProps,
)(CosmeticList)