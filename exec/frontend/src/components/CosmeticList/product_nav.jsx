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

  /** ๐ ๋ฆฌ์คํธ ํ๋ฆ ๋ฉ๋ชจ 
products๋ ํญ์ ํด๋ฆญํ  ๋ ๋ง๋ค ๊ณ์ ๋ฐ๋
selectedTab์ ๋๋ถ๋ฅ ํญ (์ ์ฒด ๋ง์ถค ์คํจ์ผ์ด ๋ฉ์ดํฌ์ ํฅ์ ๋จ์ฑ)
selectedTab2๋ ์ค๋ถ๋ฅ ํญ
๊ทธ๋์ ๋๋ถ๋ฅํญ์ ํด๋ฆญํ์ ๋ ์ด๋ฒคํธ๊ฐ changeColor
์ค๋ถ๋ฅ ํญ์ ํด๋ฆญํ์ ๋ ์ด๋ฒคํธ๊ฐ changeList
์ ๋ ฌ๊ธฐ์ค ๋ฐ๋์์๋ ์ด๋ฒคํธ๊ฐ handleChange
   */
const ProductNav = ({user}) => {
    let history = useHistory();
    // ๋ก๊ทธ์ธ ์ํ๊ฑฐ ๋ง๊ธฐ
    const [menuTab, setMenu] = useState(0);
    const [selectedTab, setTab] = useState("โ ์ ์ฒด"); 
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
        // ๋๋ถ๋ฅ ํญ ํด๋ฆญํ์ ๋๋ ๋ฌด์กฐ๊ฑด setTab2 ์ด๊ธฐํ 
        // ๋๋ถ๋ฅ ํญ์ ๋ง์ถค์ด๋ ๋ญ ๊ทธ๋ฐ๊ฑธ๋ก ์ค์ 
        setType(0);
        // ๋๋ถ๋ฅ ํญ ํด๋ฆญํ๊ฑฐ์ ๋ฐ๋ผ์ api ๋ค ๋ค๋ฅด๊ฒ ๋ณด๋ด์ค๊ฑฐ
        // ๋ง์ถค์ด๋ฉด correct ๋ญ์๊ธฐ๋ก ๋ณด๋ด์ procuts ๋ฐ๊พธ๊ณ 
        // ๋ค๋ฅธ๊ฒ๋ ๊ฐ๊ฐ ๋ง์ถฐ์ ๋ฐ๊พธ๊ณ 
        if(e.target.innerText==="โ ๋ง์ถค"){
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
        else if(e.target.innerText==="โ ์คํจ์ผ์ด"){
            setMenu(2); 
            
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/์คํจ์ผ์ด`,
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
        else if(e.target.innerText==="โ ๋ฉ์ดํฌ์"){
            setMenu(3); 
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/๋ฉ์ดํฌ์`,
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
           
        }else if(e.target.innerText==="โ ํฅ์"){
            setMenu(4);
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/ํฅ์`,
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
                 
        }else if(e.target.innerText==="โ ๋จ์ฑ"){
            setMenu(5);
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/๋จ์ฑ ํ์ฅํ`,
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
            
        }else if(e.target.innerText==="โ ์ ์ฒด"){
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
        // ์ค๋ถ๋ฅ ํญ ํด๋ฆญํ์ ๋
        // ์ค๋ถ๋ฅ ์์ฒด๊ฐ ๋๋ถ๋ฅ๋ฅผ ํด๋ฆญํ์๋ ๊ทธ๊ฑฐ์ ๋ง์ถฐ์ ๋ณด์ฌ์ฃผ๋ ๊ฑฐ๊ธฐ ๋๋ฌธ์
        // ์๊น ์ ์ฅํ๋ seletedTab(๋๋ถ๋ฅ)์ ๋ฐ๋ผ์ ๋๋์๋ค.
        // ์ง๊ธ ๋ด๊ฐ ํด๋ฆญํ๊ณ  ๋ณด๊ณ ์๋ ๋๋ถ๋ฅ๊ฐ ๋ง์ถค์ด๊ณ 
        // ๋ง๋ ์ํ์ ๋๋ ์ผ๋ฉด ๋ง๋์ํ api ๋ณด๋ด์ products ๋ฐ๊ฟ์ฃผ๊ณ 
        // ๊ทผ๋ฐ ๋ง์ถค์ default๊ฐ ๋ง๋์ํ์ด๋ผ ๋๊ฐ์๋ฐ ์๋ง๋๊ฑฐ ํด๋ฆญํ๋ค๊ฐ ๋ง๋๊ฑฐ ํด๋ฆญํ์๋ ๋ค์ ๋ฐ๊ฟ์ค์ผํ๋๊น
        // ๊ทธ๋ฆฌ๊ณ  ์ด์  ์คํจ์ผ์ด๋ ๋ฉ์ดํฌ์ ์ด๋ฐ๊ฑฐ๋ api๊ฐ ๋๊ฐ๋๋ผ๊ณ  ๋๋ถ๋ฅ/์ค๋ถ๋ฅ
        // ๊ทผ๋ฐ ๋๋ถ๋ฅ๊ฐ "โ ๋ฉ์ดํฌ์" ์ด๋ ๊ฒ ๋์ด ์์ด์ ๋ด๊ฐ ๊ท์ฐฎ์์ ์ผ์ผ์ด ๋ค ํ์ดํํ์
        // ์ค๋ถ๋ฅ๋ innerText์ ์๋ง๊ฒ ์์ ๊ทธ๋๋ก ์ฌ์ฉ
        // ์ด๋ ๊ฒ ์ค๋ถ๋ฅ ํด๋ฆญํ์๋ ๊ทธ๊ฑฐ์ ๋ฐ๋ผ์ products ๋ฐ๊ฟ์ค
        if(selectedTab==="โ ๋ง์ถค"){
            if(e.target.innerText==="๋ง๋์ํ"){
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


        } else if(selectedTab==="โ ์คํจ์ผ์ด"){
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/์คํจ์ผ์ด/${e.target.innerText}`,
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
        else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
            setMenu(3); 
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/๋ฉ์ดํฌ์/${e.target.innerText}`,
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
            
        }else if(selectedTab==="โ ๋จ์ฑ"){
            setMenu(5);
            try {
                setLoading(true);
                http({
                    method: 'GET',
                    url: `v1/items/recom/${user.userId}/๋จ์ฑ ํ์ฅํ/${e.target.innerText}`,
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

    const handleChange = (event) => { // ๐ ์ ๋ ฌ
        // selectedTab = ๋๋ถ๋ฅ ์ ์ฅํด์คฌ๊ณ , selectedTab2 = ์ค๋ถ๋ฅ ์ ์ฅํจ
        // ๊ทธ๊ฑฐ ๊ฐ๊ฐ ๊ฒฝ์ฐ ๋๋ ์ ๋ฐฑ ์์ฒญ ์งํ 
        setType(event.target.value);
        setProductsIdx(12);
        if(event.target.value==1){
            // ์ธ๊ธฐ์(๋ณ์ ์)
            if(selectedTab2===""){
                // selectedTab2๊ฐ ๋น ์คํธ๋ง์ด๋ฉด ๋๋ถ๋ฅ๋ง ํด๋ฆญํ์ ๋
                // ๋ฑ ๋๋ถ๋ฅ ์ ๋ ฌ๊น์ง๋ง
                if(selectedTab==="โ ์ ์ฒด"){
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
                   
                }else if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/์คํจ์ผ์ด`,
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
                    
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/๋ฉ์ดํฌ์`,
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
                    
                } else if(selectedTab==="โ ํฅ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/ํฅ์`,
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
                    
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/๋จ์ฑ ํ์ฅํ`,
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
                // ์ค๋ถ๋ฅ๊ฐ ์ ํ์ด ๋ ์ํ๋ก ์ ๋ ฌ๊ธฐ์ค ์ ํํ์๋ 
                // ์ค๋ถ๋ฅ๋ ์คํจ์ผ์ด๋ ๋ฉ์ดํฌ์ ๋จ์ฑํ์ฅํ ๋ฐ์ ์์ผ๋๊น ๋ง์ถค์ ์ ๋ ฌ์ด์๊ณ 
                // ๋ฐ์ ์ฝ๋๋ ๋๋ถ๋ฅ์ ๋ง์ถฐ์ ์ค๋ถ๋ฅ๊น์ง ์ ๋ ฌํด์ฃผ๋ api๋ก ํต์ผ
                // ๋๋ถ๋ฅ๋ selectedTab์ ์ ์ฅ๋๋๋ฐ ์ ์ฅํ ๊ฐ์ ๊ทธ๋๋ก ์ธ์๊ฐ ์๋๋ฐ
                // ์ค๋ถ๋ฅ๋ ๊ทธ๋๋ก ์ธ์์์ด์ ๋๋ถ๋ฅ๋ก๋ง ๋๋๊ณ  ์ ์ฅํ ์ค๋ถ๋ฅ ๊ฐ ๊ทธ๋๋ก ๋ฃ์๋ค.
                if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/์คํจ์ผ์ด/${selectedTab2}`,
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
                   
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/๋ฉ์ดํฌ์/${selectedTab2}`,
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
                    
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/score/${user.userId}/๋จ์ฑ ํ์ฅํ/${selectedTab2}`,
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
            // ๊ฐ๊ฒฉ ๋ฎ์์
            if(selectedTab2===""){ // ๊ฐ๊ฒฉ ๋ฎ์ ์์์ ์ค๋ถ๋ฅ ์ ํ ์๋ ๊ฒฝ์ฐ
                if(selectedTab==="โ ์ ์ฒด"){
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
                    
                }else if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/์คํจ์ผ์ด/0`,
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
                    
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋ฉ์ดํฌ์/0`,
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
                   
                } else if(selectedTab==="โ ํฅ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/ํฅ์/0`,
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
                    
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋จ์ฑ ํ์ฅํ/0`,
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
            }else{ // ๊ฐ๊ฒฉ ๋ฎ์ ์์์ ์ค๋ถ๋ฅ ์ ํ ๋ ๊ฒฝ์ฐ
                if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/์คํจ์ผ์ด/${selectedTab2}/0`,
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
                   
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋ฉ์ดํฌ์/${selectedTab2}/0`,
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
                   
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋จ์ฑ ํ์ฅํ/${selectedTab2}/0`,
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
            // ๊ฐ๊ฒฉ ๋์ ์
        } else if(event.target.value==3){
            // ๊ฐ๊ฒฉ๋์์ ์์ ์ค๋ถ๋ฅ ์ ํ ์ํ  ๋
            if(selectedTab2===""){
                if(selectedTab==="โ ์ ์ฒด"){
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
                    
                }else if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/์คํจ์ผ์ด/1`,
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
                    
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋ฉ์ดํฌ์/1`,
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
                    
                } else if(selectedTab==="โ ํฅ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/ํฅ์/1`,
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
                   
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋จ์ฑ ํ์ฅํ/1`,
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
                // ๊ฐ๊ฒฉ๋์์ ์์ ์ค๋ถ๋ฅ ์ ํ ๋ ๋ 
                if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/์คํจ์ผ์ด/${selectedTab2}/1`,
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
                   
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋ฉ์ดํฌ์/${selectedTab2}/1`,
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
                    
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/price/${user.userId}/๋จ์ฑ ํ์ฅํ/${selectedTab2}/1`,
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
            // ๋ฆฌ๋ทฐ์
            if(selectedTab2===""){
                // ๋ฆฌ๋ทฐ์์์ ์ค๋ถ๋ฅ ์ ํ์๋์ํ
                if(selectedTab==="โ ์ ์ฒด"){
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
                    
                }else if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/์คํจ์ผ์ด`,
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
                    
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/๋ฉ์ดํฌ์`,
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
                   
                } else if(selectedTab==="โ ํฅ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/ํฅ์`,
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
                    
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/๋จ์ฑ ํ์ฅํ`,
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
                // ๋ฆฌ๋ทฐ์์์ ์ค๋ถ๋ฅ ์ ํ๋ ์ํ 
                if(selectedTab==="โ ์คํจ์ผ์ด"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/์คํจ์ผ์ด/${selectedTab2}`,
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
                   
                } else if(selectedTab==="โ ๋ฉ์ดํฌ์"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/๋ฉ์ดํฌ์/${selectedTab2}`,
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
                    
                } else if(selectedTab==="โ ๋จ์ฑ"){
                    try {
                        setLoading(true);
                        http({
                            method: 'GET',
                            url: `v1/items/sort/reviewCnt/${user.userId}/๋จ์ฑ ํ์ฅํ/${selectedTab2}`,
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
              text: '๋ก๊ทธ์ธ ํ ์ด์ฉํด์ฃผ์ธ์',
              confirmButtonText: 'ํ์ธ',
            }).then(() => {
              history.push("/login");
            })
        } else{
            window.addEventListener('scroll', ScrollEvent);
          // ์ฒ์์ ๋ ๋๋ง ๋์๋ ์ ์ฒด ๊ธ์ด์ค๋์ 
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
        //     // setTab("โ ์ ์ฒด");
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
        if(!products[idx].dibs){ //์ข์์
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
        } else{ //์ซ์ด์
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
  

    const message = "๋ฆฌ์คํธ ๋ก๋ฉ ์ค ์๋๋ค.";
    if (loading) return (
        <>
        <div className={styles.nav}>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ์ ์ฒด" ? selectedStyle : basicStyle} onClick={changeColor}> โ ์ ์ฒด</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ๋ง์ถค" ? selectedStyle : basicStyle} onClick={changeColor}> โ ๋ง์ถค</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ์คํจ์ผ์ด" ? selectedStyle : basicStyle} onClick={changeColor}> โ ์คํจ์ผ์ด</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ๋ฉ์ดํฌ์" ? selectedStyle : basicStyle} onClick={changeColor}> โ ๋ฉ์ดํฌ์</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ํฅ์" ? selectedStyle : basicStyle} onClick={changeColor}> โ ํฅ์</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ๋จ์ฑ" ? selectedStyle : basicStyle} onClick={changeColor}> โ ๋จ์ฑ</Button>
                <div className={styles.bar}></div>
            </div>
            
        <Loader type="spin" color="#FD6C1D" message={message} />
        </>
    );
    
    else {
        return(
            <>
            <div className={styles.nav}>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ์ ์ฒด" ? selectedStyle : basicStyle} onClick={changeColor}> โ ์ ์ฒด</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ๋ง์ถค" ? selectedStyle : basicStyle} onClick={changeColor}> โ ๋ง์ถค</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ์คํจ์ผ์ด" ? selectedStyle : basicStyle} onClick={changeColor}> โ ์คํจ์ผ์ด</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ๋ฉ์ดํฌ์" ? selectedStyle : basicStyle} onClick={changeColor}> โ ๋ฉ์ดํฌ์</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ํฅ์" ? selectedStyle : basicStyle} onClick={changeColor}> โ ํฅ์</Button>
                <Button variant="contained" className={styles.nav_btn} style={selectedTab==="โ ๋จ์ฑ" ? selectedStyle : basicStyle} onClick={changeColor}> โ ๋จ์ฑ</Button>
                <div className={styles.bar}></div>
            </div>
            {
                (menuTab == 0 || menuTab == 4) && (<></>) // ์ ์ฒด, ํฅ์๋ ํ์๋ถ๋ฅ ์์
            }
            {
                menuTab == 1 && ( 
                    <div className={styles.click_nav}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button><span style={selectedTab2==="๋ง๋์ํ" ? selectStyle : startStyle} onClick={changeList}>๋ง๋์ํ</span></Button>
                            <Button><span style={selectedTab2==="์๋ง๋์ํ" ? selectStyle : startStyle} onClick={changeList}>์๋ง๋์ํ</span></Button>
                        </ButtonGroup>
                    </div>
                )
            }
            {
                menuTab == 2 && ( //์คํจ์ผ์ด
                    <div className={styles.click_nav}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button><span style={selectedTab2==="์คํจ์ผ์ด" ? selectStyle : startStyle} onClick={changeList}>์คํจ์ผ์ด</span></Button>
                            <Button><span style={selectedTab2==="์ ์ผ์ด" ? selectStyle : startStyle} onClick={changeList}>์ ์ผ์ด</span></Button>
                            <Button><span style={selectedTab2==="ํด๋ ์ง" ? selectStyle : startStyle} onClick={changeList}>ํด๋ ์ง</span></Button>
                        </ButtonGroup>
                    </div>
                )
            }
            {
                menuTab == 3 && ( //๋ฉ์ดํฌ์
                    <div className={styles.click_nav}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button><span style={selectedTab2==="ํ์ด์ค๋ฉ์ดํฌ์" ? selectStyle : startStyle} onClick={changeList}>ํ์ด์ค๋ฉ์ดํฌ์</span></Button>
                            <Button><span style={selectedTab2==="๋ฆฝ๋ฉ์ดํฌ์" ? selectStyle : startStyle} onClick={changeList}>๋ฆฝ๋ฉ์ดํฌ์</span></Button>
                            <Button><span style={selectedTab2==="์์ด๋ฉ์ดํฌ์" ? selectStyle : startStyle} onClick={changeList}>์์ด๋ฉ์ดํฌ์</span></Button>
                            <Button><span style={selectedTab2==="์ปจํฌ์ด๋ง" ? selectStyle : startStyle} onClick={changeList}>์ปจํฌ์ด๋ง</span></Button>
                        </ButtonGroup>
                    </div>
                )
            }
            {
                menuTab == 5 && ( // ๋จ์ฑ
                    <div className={styles.click_nav}>
                        <ButtonGroup variant="text" aria-label="text primary button group">
                            <Button><span style={selectedTab2==="์คํจ์ผ์ด" ? selectStyle : startStyle} onClick={changeList}>์คํจ์ผ์ด</span></Button>
                            <Button><span style={selectedTab2==="๋ฉ์ดํฌ์" ? selectStyle : startStyle} onClick={changeList} onClick={changeList}>๋ฉ์ดํฌ์</span></Button>
                            <Button><span style={selectedTab2==="ํด๋ ์ง" ? selectStyle : startStyle} onClick={changeList}>ํด๋ ์ง</span></Button>
                            <Button><span style={selectedTab2==="์์ด๋น" ? selectStyle : startStyle} onClick={changeList}>์์ด๋น</span></Button>
                        </ButtonGroup>
                    </div>
                )
            }
            {
                menuTab != 1 &&(
                    <div className={styles.filtering}>
                        <div className={styles.right_check}>
                            <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">์ ๋ ฌ๊ธฐ์ค</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    onChange={handleChange}>
                                        <MenuItem value={1}>์ธ๊ธฐ ์</MenuItem>
                                        <MenuItem value={2}>๊ฐ๊ฒฉ ๋ฎ์ ์</MenuItem>
                                        <MenuItem value={3}>๊ฐ๊ฒฉ ๋์ ์</MenuItem>
                                        <MenuItem value={4}>๋ฆฌ๋ทฐ ๊ฐ์ ์</MenuItem>
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