import React, { useEffect, useState} from 'react';
import styles from './result.module.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProductList from '../../components/common/ProductList/ProductList';
import {connect} from 'react-redux';
import Navbar from '../../components/common/Navbar/Navbar';
import Logo from '../../components/common/Logo/Logo';
import Footer from '../../components/common/Footer/Footer';
import { useHistory } from 'react-router';
import {getHelpfulProducts,getCautionProducts,setHate,setLike} from '../../service/product';
import dropGreen from '../../assets/waterdrop_green.png';
import dropRed from '../../assets/waterdrop_red.png';
import TopButton from '../../components/common/Button/TopButton/TopButton';

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
const Result = ({user,skin}) => {
  console.log(user.userId);
  const history=useHistory();
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [currTab, setCurrTab] = useState(1);
  const [currTab2, setCurrTab2] = useState(1);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const onClick = (e) => {
    if(e.target.innerText==='상품명 결과'){
      setCurrTab(currTab+1);
    } else{
      setCurrTab(currTab+1);
    }
  };
  const onClick2 = (e) => {
    if(e.target.innerText==='상품명 결과'){
      setCurrTab(currTab+1);
    } else{
      setCurrTab(currTab+1);
    }
  };
  const onClickPlus = () => {
    history.push('/list');
  };
  const onClickReset = () => {
    history.push('/skin');
  };
  const onClickFinish = () => {
    history.push('/');
  };
  const onHandleHeart1 = (item_id,idx) => {
    if(!products1[idx].dibs){ // 좋아요
      setLike(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products1.map(product => {
            if(product.item_id != item_id) return product;
            else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1};
          })
          setProducts1(tmp);
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
          const tmp = products1.map(product => {
            if(product.item_id != item_id) return product;
            else return {...product, dibs: false, dibs_cnt: product.dibs_cnt-1};
          })
          setProducts1(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    }
  }
  const onHandleHeart2 = (item_id,idx) => {
    if(!products2[idx].dibs){ // 좋아요
      setLike(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products2.map(product => {
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
          const tmp = products2.map(product => {
            if(product.item_id != item_id) return product;
            else return {...product, dibs: false, dibs_cnt: product.dibs_cnt-1};
          })
          setProducts2(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    }
  }
  useEffect(()=>{
    const a = document.querySelectorAll('.MuiTabs-flexContainer');
    a[1].style.cssText="justify-content: center;"
    getHelpfulProducts(
      user.userId,
      (res)=>{
        setProducts1(res.data.item_list.slice(0,4));
      },
      (err)=>{
        console.error(err);
      }
    )
    // getCautionProducts(
    //   user.userId,
    //   (res)=>{
    //     setProducts2(res.data.item_list.slice(0,4));
    //   },
    //   (err)=>{
    //     console.error(err);
    //   }
    // )
  },[]);
  const onClickTopButton = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  return(
    <div style={{position:'relative', paddingBottom:'180px', minHeight:"100vh"}}>
      <div className={styles.container}>
        <Navbar/>
        <Logo type={1}/>
        <div className={styles.header}>
          <div className={styles.box}>
            <div className={styles.title}><span className={styles.highlight}>{user.userNickname}</span>님의 피부타입 결과</div>
            <div className={styles.subtitle}>피부타입에 따른 성분과 제품을 추천받으세요.</div>
          </div>
        </div>
        <div className={styles.result_box}>
          <div className={styles.skininfo_box}>
            <div className={styles.skininfo_left}>
              <div className={styles.skin_type} style={{border:`2px solid ${skin.type[user.skinId.skinType].color}`,color:`${skin.type[user.skinId.skinType].color}`}}>
                {user.skinId.skinType}
              </div>
              <div className={styles.skin_box}>
                <div className={styles.skin_info1}>
                  {user.skinId.skinType[0] === 'O' ?
                    <span className={styles.skin_text}>지성</span> :
                    <span className={styles.skin_text}>건성</span>
                  }
                </div>
                <div className={styles.skin_info2}>
                  <span className={styles.skin_text}>민감</span>
                  {user.skinId.skinType[1] === 'R' ?
                    <span className={styles.skin_arrow}>↓</span> :
                    <span className={styles.skin_arrow}>↑</span>
                  }
                </div>
                <div className={styles.skin_info3}>
                  <span className={styles.skin_text}>색소</span>
                  {user.skinId.skinType[2] === 'N' ?
                    <span className={styles.skin_arrow}>↓</span> :
                    <span className={styles.skin_arrow}>↑</span>
                  }
                </div>
                <div className={styles.skin_info4}>
                  <span className={styles.skin_text}>주름</span>
                  {user.skinId.skinType[3] === 'T' ?
                    <span className={styles.skin_arrow}>↓</span> :
                    <span className={styles.skin_arrow}>↑</span>
                  }
                </div>
              </div>
            </div>
            <div className={styles.skin_desc_box}>
              {skin.type[user.skinId.skinType].tag.map((item,idx) =>{
                return(
                  <div key={item} style={{borderBottom:'1px solid #CCCCCC', paddingBottom:'0.5em'}}>
                    <div  className={styles.skin_desc_title}>
                      <span style={{color:`${skin.type[user.skinId.skinType].color}`}}>{item.slice(0,1)}</span>
                      {item.slice(1,)}
                    </div>
                    <div className={styles.skin_desc_content}>
                      {skin.type_info[item]}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.items_box}>
            <AppBar position="static" style={{ background: '#FFFFFF' , color: '#333333', boxShadow: 'none', margin: '0',}}>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab onClick={onClick} label="BEST 성분" {...a11yProps(0)} />
                <Tab onClick={onClick} label="WORST 성분" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <div className={styles.elements_box}>
                {skin.type[user.skinId.skinType].good.map(item => {
                  return(
                    <div key={item} className={styles.element_box}>
                      <div className={styles.img_box}>
                        <img className={styles.img} src={dropGreen} alt=""/>
                      </div>
                      <div className={styles.element}>{item}</div>
                    </div>
                  )
                })}
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className={styles.elements_box}>
                {skin.type[user.skinId.skinType].bad.map(item => {
                  return(
                    <div key={item} className={styles.element_box}>
                      <div className={styles.img_box}>
                        <img className={styles.img} src={dropRed} alt=""/>
                      </div>
                      <div className={styles.element}>{item}</div>
                    </div>
                  )
                })}
              </div>
            </TabPanel>
          </div>
        </div>
        <div className={styles.recommends_box}>
          <AppBar position="static" style={{ background: '#FFFFFF' , color: '#333333', boxShadow: 'none', margin: '0',}}>
            <Tabs value={value2} onChange={handleChange2} aria-label="simple tabs example">
              <Tab onClick={onClick2} label="맞는 상품" {...a11yProps(0)} />
              <Tab onClick={onClick2} label="안 맞는 상품" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <div className={styles.recommends_desc_box}>
            <div className={styles.recommends_desc}>성분일치율이 가장 높은 4가지 상품을 추천해드립니다.</div>
            <button onClick={onClickPlus} className={styles.recommends_plus}>더보기 &gt;</button>
          </div>
          <TabPanel value={value2} index={0}>
            <ProductList products={products1} handleHeart={onHandleHeart1}/>
          </TabPanel>
          <TabPanel value={value2} index={1}>
            <ProductList products={products2} handleHeart={onHandleHeart2}/>
          </TabPanel>
        </div>
        <div className={styles.btn_box}>
          <button onClick={onClickReset} className={styles.reset_btn}>&lt;&lt; 재검사하기</button>
          <button onClick={onClickFinish} className={styles.finish_btn}>완료</button>
        </div>
      </div>
      {
        window.scrollY>10 && <TopButton onClick={onClickTopButton}/>
      }
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  skin: state.skin,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result);