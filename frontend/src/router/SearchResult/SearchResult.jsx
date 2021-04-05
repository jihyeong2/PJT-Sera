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
  const params=useParams();
  const [currTab,setCurrTab] = useState(1);
  const [idx,setIdx] = useState(12);
  const [idx2,setIdx2] = useState(12);
  const [products,setProducts] = useState([]);
  const [productsKeys2, setProductsKeys2] = useState([]);
  const [products2,setProducts2] = useState([]);
  const [value, setValue] = useState(0);
  console.log(products);
  console.log(products2);
  console.log(productsKeys2)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const infinityScroll = useCallback(()=>{
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if(currTab==1){ // 상품명 결과 탭일 때 무한스크롤
      if (scrollTop + clientHeight + 2 >= scrollHeight){
        // console.log(idx);
        setIdx(idx+12);
        setProducts(products.concat(data.slice(idx,idx+12)));
      }
    }else{ // 성분명 결과 탭일 때 무한스크롤
      if (scrollTop + clientHeight + 2 >= scrollHeight){
        setIdx2(idx2+12);
        setProducts2(products2.concat(data.slice(idx2,idx2+12)));
      }
    }
  },[idx,products,idx2,products2]);

  useEffect(() => {
    window.addEventListener('scroll', infinityScroll, true);
    if(params.category==="전체"){
      getSearchAll(
        user.userId,
        params.name,
        (res)=>{
          // console.log(res);
          setProducts(res.data.item_list.item_name_list);
          setProducts2(Object.values(res.data.item_list.item_element_list));
          setProductsKeys2(Object.values(res.data.item_list.item_element_list));
        },
        (err)=>{
          console.error(err);
        }
      )
    } else{
      getSearchCategory(
        user.userId,
        params.category,
        params.name,
        (res)=>{
          // console.log(res);
          setProducts(res.data.item_list.item_name_list);
          setProducts2(Object.values(res.data.item_list.item_element_list));
          setProductsKeys2(Object.values(res.data.item_list.item_element_list));         
        },
        (err)=>{
          console.error(err);
        }
      )
    }
    return () => window.removeEventListener('scroll', infinityScroll,true);
  },[]);

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
          tmp[productsKey2].map(product => {
            if(product.item_id != item_id) return product;
            else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1};
          })
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
          tmp[productsKey2].map(product => {
            if(product.item_id != item_id) return product;
            else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1};
          })
          setProducts2(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    }
  }
  return (
    <div className={styles.container}>
      <Navbar/>
      <Logo type={1} className={styles.logo}/>
      <div className={styles.header}>
        "<span className={styles.highlight}>{params.name}</span>"의 검색 결과입니다.
      </div>
      <AppBar position="static" style={{ background: '#FFFFFF' , color: '#333333', boxShadow: 'none'}}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab onClick={onClick} label="상품명 결과" {...a11yProps(0)} />
          <Tab onClick={onClick} label="성분명 결과" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProductList products={products} handleHeart={onHandleHeart}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          productsKeys2.map((key,idx)=>{
            <div key={key} className={styles.element_box}>
              <div className={styles.element_title}>
                {
                  idx%2 == 0 ?
                  <FontAwesomeIcon icon={['fas', 'leaf']} size="sm" color="#4E9157"/>:
                  <FontAwesomeIcon icon={['fas', 'leaf']} size="sm" color="#6F6AFA"/>
                }
                &nbsp;{key}</div>
              <ProductList products={products2[idx].slice(0,4)} handleHeart2={onHandleHeart2} productsKey2={idx}/>
            </div>
          })
        }
        
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(
  mapStateToProps,
)(SearchResult)