import {useState,useEffect,useCallback} from 'react';
import styles from './Mypage.module.css';
import SkinInfo from '../../components/MyPage/SkinInfo/SkinInfo';
import MyPageTabs from '../../components/MyPage/MyPageTabs/MyPageTabs';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import TopButton from '../../components/common/Button/TopButton/TopButton';

const MyPage = (props) => {
  const [isScroll,setIsScroll] = useState(false);
  const scrollEvent = useCallback(()=>{
    if(window.scrollY>0){
      setIsScroll(true);
    } else{
      setIsScroll(false);
    }
  },[]);  
  useEffect(()=>{
    window.addEventListener('scroll', scrollEvent, true);
    return () => {
      window.removeEventListener('scroll', scrollEvent, true);
    }
  });
  const onClickTopButton = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };  
  return (
    <div style={{position:'relative',paddingBottom:'180px',minHeight:'100vh'}}>
      <div className={styles.container}>
        <Navbar/>
        <Logo type={1}/>
        <div className={styles.title}>
          마이페이지
        </div>
        <SkinInfo />
        <MyPageTabs/>
      </div>
      {
        isScroll && <TopButton onClick={onClickTopButton}/>
      }
      <Footer/>
    </div>
  );
};

export default MyPage;