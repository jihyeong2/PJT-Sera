import {useCallback, useEffect, useState} from 'react';
import styles from './SearchResult.module.css';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProductList from '../../components/common/ProductList/ProductList';
import data from '../../data/GP_items_1-10000.json';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import {connect} from 'react-redux';
import { getSearchAll, getSearchCategory } from '../../service/search';
import {setLike, setHate} from '../../service/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../components/common/Footer/Footer';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

import TopButton from '../../components/common/Button/TopButton/TopButton';
import Loader from '../../components/common/Loader/Loader';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div p={3}>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const SearchResult = ({user}) => {
  let history = useHistory();

  const params=useParams();
  const [currTab,setCurrTab] = useState(1);
  const [idx,setIdx] = useState(12);
  const [idx2,setIdx2] = useState(4);
  const [products,setProducts] = useState([]);
  const [productsKeys2, setProductsKeys2] = useState([]);
  const [products2,setProducts2] = useState([]);
  const [value, setValue] = useState(0);
  const [isScroll,setIsScroll] = useState(false);
  const [isLoading,setIsLoading] = useState('');
  const ScrollEvent =()=>{
    if(window.scrollY>0){
      setIsScroll(true);
    } else{
      setIsScroll(false);
    }
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if(value===0){ // 상품명 결과 탭일 때 무한스크롤
      if (scrollTop + clientHeight + 2 >= scrollHeight){
        const tmp=idx+12;
        setIdx(tmp);
      }
    }else{ // 성분명 결과 탭일 때 무한스크롤
      if (scrollTop + clientHeight + 2 >= scrollHeight){
        const tmp=idx2+4;
        setIdx2(tmp);
      }
    }
  } 
  useEffect(() => {
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

  else if(user.skinId == null){
    Swal.fire({
      icon: 'error',
      text: '피부진단 후 이용해주세요',
      confirmButtonText: '진단하기',
    }).then(() => {
      history.push("/skin/");
    })
  }else{
    window.addEventListener('scroll', ScrollEvent);
    if(products.length===0 && products2.length===0){
      if(params.category==="전체"){
        getSearchAll(
          user.userId,
          params.name,
          (res)=>{
            // console.log(res);
            setIsLoading(false);
            setProducts(res.data.item_list.item_name_list);
            setProducts2(Object.values(res.data.item_list.item_element_list));
            setProductsKeys2(Object.keys(res.data.item_list.item_element_list));
          },
          (err)=>{
            setIsLoading(false);
            console.error(err);
          }
        )
      } else{
        getSearchCategory(
          user.userId,
          params.category,
          params.name,
          (res)=>{
            setIsLoading(false);
            setProducts(res.data.item_list.item_name_list);
            setProducts2(Object.values(res.data.item_list.item_element_list));
            setProductsKeys2(Object.keys(res.data.item_list.item_element_list));         
          },
          (err)=>{
            setIsLoading(false);
            console.error(err);
          }
        )
      }
    }
    return () => window.removeEventListener('scroll', ScrollEvent);
  }
    
  },[params,value,idx,idx2]);  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onClick = (e) => {
    if(e.target.innerText==='상품명 결과'){
      setCurrTab(1);
    } else{
      setCurrTab(2);
    }
  };
  const onHandleHeart = (item_id,idx) => {
    if(!products[idx].dibs){ // 좋아요
      setLike(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products.map(product => {
            if(product.item_id != item_id) return product;
            else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1};
          })
          setProducts(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    } else{ // 싫어요
      setHate(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products.map(product => {
            if(product.item_id != item_id) return product;
            else return {...product, dibs: false, dibs_cnt: product.dibs_cnt-1};
          })
          setProducts(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    }
  };
  const onHandleHeart2 = (productsKey2,item_id,idx) => {
    if(!products2[productsKey2][idx].dibs){ // 좋아요
      setLike(
        user.userId,
        item_id,
        (res)=>{
          const tmp = [...products2];
          tmp[productsKey2]=tmp[productsKey2].map(product => {
            if(product.item_id !== item_id) {
              return product;
            }
            else {
              return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1};
            }
          });
          setProducts2(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    } else{ // 싫어요
      setHate(
        user.userId,
        item_id,
        (res)=>{
          const tmp = [...products2];
          tmp[productsKey2]=tmp[productsKey2].map(product => {
            if(product.item_id !== item_id) return product;
            else {
              return {...product, dibs: false, dibs_cnt: product.dibs_cnt-1};
            }
          })
          setProducts2(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    }
  };
  const onClickTopButton = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };  
  return (
    <div style={{position:'relative', paddingBottom:'180px', minHeight:'100vh'}}>
      <Loader open={isLoading}/>
      <div className={styles.container}>
        <Navbar/>
        <Logo type={1} className={styles.logo}/>
        <div className={styles.header}>
          "<span className={styles.highlight}>{params.name}</span>"의 검색 결과입니다.
        </div>
        <AppBar position="static" style={{ background: '#FFFFFF' , color: '#333333', boxShadow: 'none'}}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="상품명 결과" {...a11yProps(0)} />
            <Tab label="성분명 결과" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ProductList products={products.slice(0,idx)} handleHeart={onHandleHeart}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {
            products2.length>0 && productsKeys2.slice(0,idx2).map((key,idx)=>{
              return(
                <div key={key} className={styles.element_box}>
                  <div className={styles.element_title}>
                    <FontAwesomeIcon icon={['fas', 'leaf']} size="sm" color="#333333"/>&nbsp;
                    {
                      idx%2==0 ?
                      <span style={{color:'#4E9157'}}>{key}</span> :
                      <span style={{color:'#6F6AFA'}}>{key}</span>
                    }
                  </div>
                  <ProductList products={products2[idx].slice(0,4)} handleHeart2={onHandleHeart2} productsKey2={idx}/>
                </div>
              );
            })
          }
        </TabPanel>
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

export default connect(
  mapStateToProps,
)(SearchResult)