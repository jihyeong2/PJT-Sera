import React, { useCallback, useEffect, useState} from 'react';
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
import Loader from '../../components/common/Loding/Loader';

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
  const history=useHistory();
  const [isScroll,setIsScroll] = useState(false);
  const [value, setValue] = useState(0);
  const [value2, setValue2] = useState(0);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [loading,setLoading] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
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
    if(!products1[idx].dibs){ // ?????????
      setLike(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products1.map(product => {
            if(product.item_id !== item_id) return product;
            else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1};
          })
          setProducts1(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    } else{ // ?????????
      setHate(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products1.map(product => {
            if(product.item_id !== item_id) return product;
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
    if(!products2[idx].dibs){ // ?????????
      setLike(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products2.map(product => {
            if(product.item_id !== item_id) return product;
            else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1};
          })
          setProducts2(tmp);
        },
        (err)=>{
          console.error(err);
        }
      )
    } else{ // ?????????
      setHate(
        user.userId,
        item_id,
        (res)=>{
          const tmp = products2.map(product => {
            if(product.item_id !== item_id) return product;
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
  const scrollEvent = useCallback(()=>{
    if(window.scrollY>0){
      setIsScroll(true);
    } else{
      setIsScroll(false);
    }
  },[]);
  useEffect(()=>{
    getHelpfulProducts(
      user.userId,
      (res)=>{
        setLoading(false);
        setProducts1(res.data.item_list.slice(0,4));
      },
      (err)=>{
        setLoading(false);
        console.error(err);
      }
    )
    getCautionProducts(
      user.userId,
      (res)=>{
        setLoading(false);
        setProducts2(res.data.item_list.slice(0,4));
      },
      (err)=>{
        setLoading(false);
        console.error(err);
      }
    )
    window.addEventListener('scroll', scrollEvent, true);
    return () => {
      window.removeEventListener('scroll', scrollEvent, true);
    }
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
        {
          loading ?
          <Loader type="spin" color="#FD6C1D" message="???????????? ?????? ?????? ??? ?????????." /> :
          <>
            <div className={styles.header}>
              <div className={styles.box}>
                <div className={styles.title}><span className={styles.highlight}>{user.userNickname}</span>?????? ???????????? ??????</div>
                <div className={styles.subtitle}>??????????????? ?????? ????????? ????????? ??????????????????.</div>
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
                        <span className={styles.skin_text}>??????</span> :
                        <span className={styles.skin_text}>??????</span>
                      }
                    </div>
                    <div className={styles.skin_info2}>
                      <span className={styles.skin_text}>??????</span>
                      {user.skinId.skinType[1] === 'R' ?
                        <span className={styles.skin_arrow}>???</span> :
                        <span className={styles.skin_arrow}>???</span>
                      }
                    </div>
                    <div className={styles.skin_info3}>
                      <span className={styles.skin_text}>??????</span>
                      {user.skinId.skinType[2] === 'N' ?
                        <span className={styles.skin_arrow}>???</span> :
                        <span className={styles.skin_arrow}>???</span>
                      }
                    </div>
                    <div className={styles.skin_info4}>
                      <span className={styles.skin_text}>??????</span>
                      {user.skinId.skinType[3] === 'T' ?
                        <span className={styles.skin_arrow}>???</span> :
                        <span className={styles.skin_arrow}>???</span>
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
                    <Tab label="BEST ??????" {...a11yProps(0)} />
                    <Tab label="WORST ??????" {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <div className={styles.elements_box}>
                    {skin.type[user.skinId.skinType].good.map((item,idx) => {
                      return(
                        <div key={`${idx}_good`} className={styles.element_box}>
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
                    {skin.type[user.skinId.skinType].bad.map((item,idx) => {
                      return(
                        <div key={`${idx}_bad`} className={styles.element_box}>
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
                  <Tab label="?????? ??????" {...a11yProps(0)} />
                  <Tab label="??? ?????? ??????" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <div className={styles.recommends_desc_box}>
                <div className={styles.recommends_desc}>?????????????????? ?????? ?????? 4?????? ????????? ?????????????????????.</div>
                <button onClick={onClickPlus} className={styles.recommends_plus}>????????? &gt;</button>
              </div>
              <TabPanel value={value2} index={0}>
                <ProductList products={products1} handleHeart={onHandleHeart1}/>
              </TabPanel>
              <TabPanel value={value2} index={1}>
                <ProductList products={products2} handleHeart={onHandleHeart2}/>
              </TabPanel>
            </div>
            <div className={styles.btn_box}>
              <button onClick={onClickReset} className={styles.reset_btn}>&lt;&lt; ???????????????</button>
              <button onClick={onClickFinish} className={styles.finish_btn}>??????</button>
            </div>
          </>
        }
      </div>
      {
        isScroll && <TopButton onClick={onClickTopButton}/>
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