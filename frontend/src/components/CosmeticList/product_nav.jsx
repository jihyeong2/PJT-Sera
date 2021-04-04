import React, { useEffect, useState } from 'react';
import styles from './product_nav.module.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ProductList from '../../components/common/ProductList/ProductList';
import {connect} from 'react-redux';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ProductNav = ({user}) => {
    const [menuTab, setMenu] = useState(0);
    const [selectedTab, setTab] = useState("✔ 전체"); 
    const [products, setProducts] = useState([]);

    console.log(selectedTab);
    const selectedStyle = {
        backgroundColor:"#FFB58D",
        color:"white"
    };
    const basicStyle = {
        backgroundColor:"rgb(241, 241, 241)",
        color:"#666666" 
    };
    const changeColor = (e) => {
        console.log("이거냐: "+e);
        setTab(e.target.innerText);
        if(e.target.innerText==="✔ 맞춤")setMenu(1); 
        else if(e.target.innerText==="✔ 스킨케어") setMenu(2); 
        else if(e.target.innerText==="✔ 메이크업"){
            setMenu(3); 
            // axios({
            //     method: 'GET',
            //     url: `http://localhost:8000/v1/items/recom/${user.userId}/메이크업`,
            //     headers:{
            //         "Content-type": "application/json",
            //     }
            //     })
            //     .then(res=>{
            //         console.log("메이크업리스트 데이터 ");
            //     console.log(res.data);                                
            //     setProducts(res.data);
            //     })
            //     .catch(err=>{
            //         console.log("메이크업리스트 에러");
            //     console.error(err);
            //     })
        }else if(e.target.innerText==="✔ 향수"){
            setMenu(4); 
        }else if(e.target.innerText==="✔ 남성"){
            setMenu(5); 
        }else if(e.target.innerText==="✔ 전체")setMenu(0); 
        setList("");
    }

    const [selectList, setList] = useState("");
    console.log("?"+selectedTab);
    const selectStyle = {
        color:"#333333",
        textDecoration: "underline",
        textUnderlinePosition: "under"
    };
    const startStyle = {
        color:"#999999" 
    };

    const changeList = (e) => {
        console.log("changeList: "+e);
        setList(e.target.innerText);
    }

    const classes = useStyles();
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };
    useEffect(()=>{
        return () => {
            setType('');
            setTab("✔ 전체");
            setMenu(0);
            setList(""); 
            getAllList();
        }
    });

     const getAllList = () => {
        axios({
        method: 'GET',
        url: `http://localhost:8000/v1/items/recom/${user.userId}`,
        headers:{
            "Content-type": "application/json",
        }
        })
        .then(res=>{
            console.log("전체 리스트 데이터 ");
        console.log(res.data);                                
        setProducts(res.data);
        console.log("상품리스트 : "+ products);
        })
        .catch(err=>{
            console.log("전체 리스트 에러");
        console.error(err);
        })
    }
    return(
        <>
        <div className={styles.nav}>
            <Button variant="contained" className={styles.nav_btn} style={selectedTab==="✔ 전체" ? selectedStyle : basicStyle} onClick={changeColor}> ✔ 전체</Button>
            <Button variant="contained" className={styles.nav_btn} style={selectedTab==="✔ 맞춤" ? selectedStyle : basicStyle} onClick={changeColor}> ✔ 맞춤</Button>
            <Button variant="contained" className={styles.nav_btn} style={selectedTab==="✔ 스킨케어" ? selectedStyle : basicStyle} onClick={changeColor}> ✔ 스킨케어</Button>
            <Button variant="contained" className={styles.nav_btn} style={selectedTab==="✔ 메이크업" ? selectedStyle : basicStyle} onClick={changeColor}> ✔ 메이크업</Button>
            <Button variant="contained" className={styles.nav_btn} style={selectedTab==="✔ 향수" ? selectedStyle : basicStyle} onClick={changeColor}> ✔ 향수</Button>
            <Button variant="contained" className={styles.nav_btn} style={selectedTab==="✔ 남성" ? selectedStyle : basicStyle} onClick={changeColor}> ✔ 남성</Button>
            <div className={styles.bar}></div>
        </div>
        {
            (menuTab == 0 || menuTab == 4) && (<></>) // 전체, 향수는 하위분류 없음
        }
        {
            menuTab == 1 && ( 
                <div className={styles.click_nav}>
                    <ButtonGroup variant="text" aria-label="text primary button group">
                        <Button><span style={selectList==="맞는상품" ? selectStyle : startStyle} onClick={changeList}>스킨케어</span> &nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="안맞는상품" ? selectStyle : startStyle} onClick={changeList} onClick={changeList}>메이크업</span> &nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                    </ButtonGroup>
                </div>
            )
        }
        {
            menuTab == 2 && ( //스킨케어
                <div className={styles.click_nav}>
                    <ButtonGroup variant="text" aria-label="text primary button group">
                        <Button><span style={selectList==="스킨케어" ? selectStyle : startStyle} onClick={changeList}>스킨케어</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="선케어" ? selectStyle : startStyle} onClick={changeList}>선케어</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="클랜징" ? selectStyle : startStyle} onClick={changeList}>클랜징</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                    </ButtonGroup>
                </div>
            )
        }
        {
            menuTab == 3 && ( //메이크업
                <div className={styles.click_nav}>
                    <ButtonGroup variant="text" aria-label="text primary button group">
                        <Button><span style={selectList==="페이스메이크업" ? selectStyle : startStyle} onClick={changeList}>페이스메이크업</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="립메이크업" ? selectStyle : startStyle} onClick={changeList}>립메이크업</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="아이메이크업" ? selectStyle : startStyle} onClick={changeList}>아이메이크업</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="컨투어링" ? selectStyle : startStyle} onClick={changeList}>컨투어링</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                    </ButtonGroup>
                </div>
            )
        }
        {
            menuTab == 5 && ( // 남성
                <div className={styles.click_nav}>
                    <ButtonGroup variant="text" aria-label="text primary button group">
                        <Button><span style={selectList==="스킨케어" ? selectStyle : startStyle} onClick={changeList}>스킨케어</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="메이크업" ? selectStyle : startStyle} onClick={changeList} onClick={changeList}>메이크업</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="클랜징" ? selectStyle : startStyle} onClick={changeList}>클랜징</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                        <Button><span style={selectList==="쉐이빙" ? selectStyle : startStyle} onClick={changeList}>쉐이빙</span>&nbsp;<span className={styles.num}>(<span>8</span>)</span></Button>
                    </ButtonGroup>
                </div>
            )
        }
        {
            menuTab != 1 &&(
                <div className={styles.filtering}>
                    <div className={styles.right_check}>
                        <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">정렬기준</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                onChange={handleChange}>
                                    <MenuItem value={1}>가격 낮은 순</MenuItem>
                                    <MenuItem value={2}>가격 높은 순</MenuItem>
                                    <MenuItem value={3}>별점순</MenuItem>
                                    <MenuItem value={4}>리뷰 개수 순</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            )
        }
        <div className={styles.list}>
            {/* <ProductList products={products.item_list} /> */}
        </div>
        </>
    )
}

// export default ProductNav;
const mapStateToProps = (state) => ({
    user: state.user.user,
  })
  export default connect(
    mapStateToProps,
  )(ProductNav);