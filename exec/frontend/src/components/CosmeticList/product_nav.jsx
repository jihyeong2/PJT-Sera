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
import http from '../../http-django';
import {setLike, setHate} from '../../service/product';
import Loader from '../../components/common/Loding/Loader';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  /** 📑 리스트 흐름 메모 
products는 탭을 클릭할 때 마다 계속 바뀜
selectedTab은 대분류 탭 (전체 맞춤 스킨케어 메이크업 향수 남성)
selectedTab2는 중분류 탭
그래서 대분류탭을 클릭했을 때 이벤트가 changeColor
중분류 탭을 클릭했을 때 이벤트가 changeList
정렬기준 바뀌었을때 이벤트가 handleChange
   */
const ProductNav = ({user}) => {
    let history = useHistory();
    // 로그인 안한거 막기
    const [menuTab, setMenu] = useState(0);
    const [selectedTab, setTab] = useState("✔ 전체"); 
    const [selectedTab2, setTab2] = useState(""); 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(null);
    const [productsIdx,setProductsIdx] = useState(12);

    const selectedStyle = {
        backgroundColor:"#FFB58D",
        color:"white"
    };
    const basicStyle = {
        backgroundColor:"rgb(241, 241, 241)",
        color:"#666666" 
    };
    const changeColor = (e) => {
        setTab(e.target.innerText);
        setProductsIdx(12);
        setTab2("");
        // 대분류 탭 클릭했을 때는 무조건 setTab2 초기화 
        // 대분류 탭을 맞춤이랑 뭐 그런걸로 설정
        setType(0);
        // 대분류 탭 클릭한거에 따라서 api 다 다르게 보내준거
        // 맞춤이면 correct 뭐시기로 보내서 procuts 바꾸고
        // 다른것도 각각 맞춰서 바꾸고
        if(e.target.innerText==="✔ 맞춤"){
            setMenu(1)
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/correct/helpful/${user.userId}`,
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(res=>{                             
                    setProducts(res.data.item_list);
                })
                .catch(err=>{
                    console.error(err);
                })              
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
                          
        }
        else if(e.target.innerText==="✔ 스킨케어"){
            setMenu(2); 
            
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/스킨케어`,
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(res=>{                            
                    setProducts(res.data.item_list);
                })
                .catch(err=>{
                    console.error(err);
                })            
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
        }
        else if(e.target.innerText==="✔ 메이크업"){
            setMenu(3); 
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/메이크업`,
                    headers:{
                        "Content-type": "application/json",
                    }
                    })
                    .then(res=>{                           
                        setProducts(res.data.item_list);
                    })
                    .catch(err=>{
                    console.error(err);
                    })        
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
           
        }else if(e.target.innerText==="✔ 향수"){
            setMenu(4);
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/향수`,
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(res=>{                                
                    setProducts(res.data.item_list);
                })
                .catch(err=>{
                    console.error(err);
                })            
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
                 
        }else if(e.target.innerText==="✔ 남성"){
            setMenu(5);
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/남성 화장품`,
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(res=>{                               
                    setProducts(res.data.item_list);
                })
                .catch(err=>{
                    console.error(err);
                })                
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
            
        }else if(e.target.innerText==="✔ 전체"){
            setMenu(0);
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}`,
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(res=>{                               
                    setProducts(res.data.item_list);
                })
                .catch(err=>{
                    console.error(err);
                })      
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
        }
    }

    const [selectList, setList] = useState("");
    const selectStyle = {
        color:"#333333",
        textDecoration: "underline",
        textUnderlinePosition: "under"
    };
    const startStyle = {
        color:"#999999" 
    };

    const changeList = (e) => {
        setTab2(e.target.innerText);
        setProductsIdx(12);
        setType(0);
        // 중분류 탭 클릭했을 때
        // 중분류 자체가 대분류를 클릭했을때 그거에 맞춰서 보여주는 거기 때문에
        // 아까 저장했던 seletedTab(대분류)에 따라서 나누었다.
        // 지금 내가 클릭하고 보고있는 대분류가 맞춤이고
        // 맞는 상품을 눌렀으면 맞는상품 api 보내서 products 바꿔주고
        // 근데 맞춤은 default가 맞는상품이라 똑같은데 안맞는거 클릭했다가 맞는거 클릭했을때 다시 바꿔줘야하니까
        // 그리고 이제 스킨케어랑 메이크업 이런거는 api가 똑같더라고 대분류/중분류
        // 근데 대분류가 "✔ 메이크업" 이렇게 되어 있어서 내가 귀찮아서 일일이 다 타이핑했음
        // 중분류는 innerText에 알맞게 와서 그대로 사용
        // 이렇게 중분류 클릭했을때 그거에 따라서 products 바꿔줌
        if(selectedTab==="✔ 맞춤"){
            if(e.target.innerText==="맞는상품"){
                try {
                    setLoading(true);
                    http({
                        method: 'GET',
                        url: `v1/items/correct/helpful/${user.userId}`,
                        headers:{
                            "Content-type": "application/json",
                        }
                    })
                    .then(res=>{                               
                        setProducts(res.data.item_list);
                    })
                    .catch(err=>{
                        console.error(err);
                    })
                }catch(e){
                    console.log(e);
                }
                setTimeout(function() {
                    setLoading(false);
                  }, 1000);
                
            }
            else{
                try {
                    setLoading(true);
                    http({
                        method: 'GET',
                        url: `v1/items/correct/caution/${user.userId}`,
                        headers:{
                            "Content-type": "application/json",
                        }
                    })
                    .then(res=>{                                
                        setProducts(res.data.item_list);
                    })
                    .catch(err=>{
                        console.error(err);
                    })     
                }catch(e){
                    console.log(e);
                }
                setTimeout(function() {
                    setLoading(false);
                  }, 1000);
                    
            }


        } else if(selectedTab==="✔ 스킨케어"){
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/스킨케어/${e.target.innerText}`,
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(res=>{                                
                    setProducts(res.data.item_list);
                })
                .catch(err=>{
                    console.error(err);
                })
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
            
        }
        else if(selectedTab==="✔ 메이크업"){
            setMenu(3); 
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/메이크업/${e.target.innerText}`,
                    headers:{
                        "Content-type": "application/json",
                    }
                    })
                    .then(res=>{                           
                        setProducts(res.data.item_list);
                    })
                    .catch(err=>{
                    console.error(err);
                    })
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
            
        }else if(selectedTab==="✔ 남성"){
            setMenu(5);
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/남성 화장품/${e.target.innerText}`,
                    headers:{
                        "Content-type": "application/json",
                    }
                })
                .then(res=>{                             
                    setProducts(res.data.item_list);
                })
                .catch(err=>{
                    console.error(err);
                })   
            }catch(e){
                console.log(e);
            }
            setTimeout(function() {
                setLoading(false);
              }, 1000);
        }
    }

    const classes = useStyles();
    const [type, setType] = React.useState(0);

    const handleChange = (event) => { // 😀 정렬
        // selectedTab = 대분류 저장해줬고, selectedTab2 = 중분류 저장함
        // 그거 각각 경우 나눠서 백 요청 진행 
        setType(event.target.value);
        setProductsIdx(12);
        if(event.target.value==1){
            // 인기순(별점순)
            if(selectedTab2===""){
                // selectedTab2가 빈 스트링이면 대분류만 클릭했을 때
                // 딱 대분류 정렬까지만
                if(selectedTab==="✔ 전체"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                }else if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/스킨케어`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/메이크업`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 향수"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/향수`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/남성 화장품`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }
            }else{
                // 중분류가 선택이 된 상태로 정렬기준 선택했을때 
                // 중분류는 스킨케어랑 메이크업 남성화장품 밖에 없으니까 맞춤은 정렬이없고
                // 밑에 코드는 대분류에 맞춰서 중분류까지 정렬해주는 api로 통일
                // 대분류도 selectedTab에 저장되는데 저장한 값을 그대로 쓸수가 없는데
                // 중분류는 그대로 쓸수있어서 대분류로만 나누고 저장한 중분류 값 그대로 넣었다.
                if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/스킨케어/${selectedTab2}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/메이크업/${selectedTab2}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/남성 화장품/${selectedTab2}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                }
            }
        } else if(event.target.value==2){ 
            // 가격 낮은순
            if(selectedTab2===""){ // 가격 낮은 순에서 중분류 선택 안된 경우
                if(selectedTab==="✔ 전체"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }else if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/스킨케어/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/메이크업/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 향수"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/향수/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/남성 화장품/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }
            }else{ // 가격 낮은 순에서 중분류 선택 된 경우
                if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/스킨케어/${selectedTab2}/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/메이크업/${selectedTab2}/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/남성 화장품/${selectedTab2}/0`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }
            }
            // 가격 높은 순
        } else if(event.target.value==3){
            // 가격높은순 에서 중분류 선택 안할 때
            if(selectedTab2===""){
                if(selectedTab==="✔ 전체"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }else if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/스킨케어/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/메이크업/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 향수"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/향수/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/남성 화장품/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }
            }else{
                // 가격높은순 에서 중분류 선택 될때 
                if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/스킨케어/${selectedTab2}/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/메이크업/${selectedTab2}/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/남성 화장품/${selectedTab2}/1`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }
            }
        } else if(event.target.value==4){
            // 리뷰순
            if(selectedTab2===""){
                // 리뷰순에서 중분류 선택안된상태
                if(selectedTab==="✔ 전체"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })  
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }else if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/스킨케어`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })  
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/메이크업`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            }) 
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 향수"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/향수`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/남성 화장품`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }
            }else{ 
                // 리뷰순에서 중분류 선택된 상태 
                if(selectedTab==="✔ 스킨케어"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/스킨케어/${selectedTab2}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                   
                } else if(selectedTab==="✔ 메이크업"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/메이크업/${selectedTab2}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                } else if(selectedTab==="✔ 남성"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/남성 화장품/${selectedTab2}`,
                            headers:{
                                "Content-type": "application/json",
                            }
                            })
                            .then(res=>{                           
                                setProducts(res.data.item_list);
                            })
                            .catch(err=>{
                            console.error(err);
                            })
                    }catch(e){
                        console.log(e);
                    }
                    setTimeout(function() {
                        setLoading(false);
                      }, 1000);
                    
                }
            }
        }
    };
    const ScrollEvent =()=>{
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
      let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
      let clientHeight = document.documentElement.clientHeight;
      if (scrollTop + clientHeight + 2 >= scrollHeight){
        const tmp=productsIdx+12;
        setProductsIdx(tmp);
      }
    }
    useEffect(()=>{
        if(user == null){
            Swal.fire({
              icon: 'error',
              text: '로그인 후 이용해주세요',
              confirmButtonText: '확인',
            }).then(() => {
              history.push("/login");
            })
        } else{
            window.addEventListener('scroll', ScrollEvent);
          // 처음에 렌더링 됐을때 전체 긁어오는애
            if(products.length===0){
                try {
                    setLoading(true);
                    getAllList();
                } catch(e){
                    console.log(e);
                }
                setTimeout(function() {
                    setLoading(false);
                }, 1500);
            }

        }
        // return () => {
        //     // setType('');
        //     // setTab("✔ 전체");
        //     // setMenu(0);
        //     // setList("");
        //     window.removeEventListener('scroll', ScrollEvent);
        // }
        return () => window.removeEventListener('scroll',ScrollEvent);
    },[productsIdx]); 

    const getAllList = () => {
            http({
                method: 'GET',
                url: `v1/items/recom/${user.userId}`,
                headers:{
                    "Content-type": "application/json",
                }
            })
            .then(res=>{                              
                setProducts(res.data.item_list);
            })
            .catch(err=>{
                console.error(err);
            })
    };
    const onHandleHeart = (item_id,idx) =>{
        if(!products[idx].dibs){ //좋아요
            setLike(
                user.userId,
                item_id,
                (res)=>{
                    const tmp = products.map(product=>{
                        if(product.item_id != item_id) return product;
                        else return {...product, dibs: true, dibs_cnt: product.dibs_cnt+1}
                    })
                    setProducts(tmp);
                },
                (err)=>{
                    console.error(err);
                }
            )
        } else{ //싫어요
            setHate(
                user.userId,
                item_id,
                (res)=>{
                    const tmp = products.map(product=>{
                        if(product.item_id != item_id) return product;
                        else return {...product, dibs: false, dibs_cnt: product.dibs_cnt-1}
                    })
                    setProducts(tmp);
                },
                (err)=>{
                    console.error(err);
                }
            )
        }
    }
  

    const message = "리스트 로딩 중 입니다.";
    if (loading) return (
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
            
        <Loader type="spin" color="#FD6C1D" message={message} />
        </>
    );
    
    else {
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
                            <Button><span style={selectedTab2==="맞는상품" ? selectStyle : startStyle} onClick={changeList}>맞는상품</span></Button>
                            <Button><span style={selectedTab2==="안맞는상품" ? selectStyle : startStyle} onClick={changeList}>안맞는상품</span></Button>
                        </ButtonGroup>
                    </div>
                )
            }
            {
                menuTab == 2 && ( //스킨케어
                    <div className={styles.click_nav}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button><span style={selectedTab2==="스킨케어" ? selectStyle : startStyle} onClick={changeList}>스킨케어</span></Button>
                            <Button><span style={selectedTab2==="선케어" ? selectStyle : startStyle} onClick={changeList}>선케어</span></Button>
                            <Button><span style={selectedTab2==="클랜징" ? selectStyle : startStyle} onClick={changeList}>클랜징</span></Button>
                        </ButtonGroup>
                    </div>
                )
            }
            {
                menuTab == 3 && ( //메이크업
                    <div className={styles.click_nav}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button><span style={selectedTab2==="페이스메이크업" ? selectStyle : startStyle} onClick={changeList}>페이스메이크업</span></Button>
                            <Button><span style={selectedTab2==="립메이크업" ? selectStyle : startStyle} onClick={changeList}>립메이크업</span></Button>
                            <Button><span style={selectedTab2==="아이메이크업" ? selectStyle : startStyle} onClick={changeList}>아이메이크업</span></Button>
                            <Button><span style={selectedTab2==="컨투어링" ? selectStyle : startStyle} onClick={changeList}>컨투어링</span></Button>
                        </ButtonGroup>
                    </div>
                )
            }
            {
                menuTab == 5 && ( // 남성
                    <div className={styles.click_nav}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button><span style={selectedTab2==="스킨케어" ? selectStyle : startStyle} onClick={changeList}>스킨케어</span></Button>
                            <Button><span style={selectedTab2==="메이크업" ? selectStyle : startStyle} onClick={changeList} onClick={changeList}>메이크업</span></Button>
                            <Button><span style={selectedTab2==="클랜징" ? selectStyle : startStyle} onClick={changeList}>클랜징</span></Button>
                            <Button><span style={selectedTab2==="쉐이빙" ? selectStyle : startStyle} onClick={changeList}>쉐이빙</span></Button>
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
                                        <MenuItem value={1}>인기 순</MenuItem>
                                        <MenuItem value={2}>가격 낮은 순</MenuItem>
                                        <MenuItem value={3}>가격 높은 순</MenuItem>
                                        <MenuItem value={4}>리뷰 개수 순</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                )
            }
            <div className={styles.list}>
                <ProductList products={products.slice(0,productsIdx)} handleHeart={onHandleHeart}/>
            </div>
            </>
        )
    }
    
}

// export default ProductNav;
const mapStateToProps = (state) => ({
    user: state.user.user,
  })
  export default connect(
    mapStateToProps,
  )(ProductNav);