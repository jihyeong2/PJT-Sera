import React, { Component, useEffect, useState, useCallback } from 'react';
import DetailLeft from '../../components/CosmeticDetail/detail/detail_left';
import DetailRight from '../../components/CosmeticDetail/detail/detail_right';
import Youtube from '../../components/CosmeticDetail/youtube/youtube_list';
import Review from '../../components/CosmeticDetail/review/review';
import YoutubeDetail from '../../components/CosmeticDetail/youtube/youtube_detail'
import styles from './CosmeticDetail.module.css'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Logo from '../../components/common/Logo/Logo';
import Navbar from '../../components/common/Navbar/Navbar';
import { DialogContent } from '@material-ui/core';
import http from "../../http-common.js";
import httpd from "../../http-django";
import {connect} from 'react-redux';
import { useParams } from 'react-router';
import TopButton from  '../../components/common/Button/TopButton/TopButton';
import Footer from '../../components/common/Footer/Footer';
const dstyles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
  },
});

const DialogTitle = withStyles(dstyles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const CosmeticDetail = ({user}) => {
    const [product, setProduct] = useState(null);
    const param = useParams();
    const [isScroll,setIsScroll] = useState(false);
    // 아이템 가져오기 + 유튜브 불러오기 
    const getItem = () => {
      httpd({
            method: 'GET',
            url: `v1/items/${user.userId}/${param.id}`,
            headers:{
              "Content-type": "application/json",
            }
          })
          .then(res=>{
              console.log("데이터");
            console.log(res.data);
            setProduct(res.data);

            const requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${res.data.item_name}&type=video&order=viewCount&maxResults=8&key=AIzaSyCIWCezwelvcvMD5ChmGFzuHm8BVbHOHx0`, requestOptions)
            .then(response => response.json()) // 보기좋은 json 형식
            .then(result => result.items.map(item => ({...item, id:item.id.videoId}))) // 그대로 하는데 id만 object가 아니라 videoId로 덮어주는 작업
            .then(items => setVideos(items)) // 그 비디오 아이템들로 업뎃
            .catch(error => console.log('error', error));
          })
          .catch(err=>{
              console.log("에러");
            console.error(err);
          })
    }
    
    const [videos, setVideos] = useState([]);

    const [selectedVideo, setSelectedVideo] = useState(null);
    const selectVideo = (video) => {
        setOpen(true);
        setSelectedVideo(video); // 선택된 비디오로 업뎃 
    };

    // 리뷰 가져오기 + 점수계산
    const [review, setReview] = useState([]);

    const getReview = () => {
        http({
            method: 'GET',
            url: `v1/review/list/${param.id}/${user.userLoginId}`,
            headers:{
              "Content-type": "application/json",
            }
          })
          .then(res=>{
              console.log("리뷰 리스트 데이터");
            console.log(res.data.data);
            setReview(res.data.data);
            getGrade(res.data.data);
          })
          .catch(err=>{
              console.log("리뷰 리스트 에러");
            console.error(err);
          })
    }

    // 최신 사진 가져오기
    const [picture, setPicture] = useState([]);

    const getPicture = () => {
        http({
            method: 'GET',
            url: `v1/review/list/photo/${param.id}`,
            headers:{
              "Content-type": "application/json",
            }
          })
          .then(res=>{
              console.log("최신 사진 데이터");
            console.log(res.data.data);
            setPicture(res.data.data);
          })
          .catch(err=>{
              console.log("최신 사진 에러");
            console.error(err);
          })
    }

    const [avg, setAvg] = useState(0); //리뷰 평점
    const [grade, setGrade] = useState({ //리뷰차트
      star_5: 0,
      star_4: 0,
      star_3: 0,
      star_2: 0,
      star_1: 0
    })
    const getGrade = (a) => {
      console.log("리뷰dd데이터:"+review);
      for(var r in a){
        setSum(sum+a[r].reviewScore);
        console.log("for문돔"+a[r].reviewScore);
        switch(a[r].reviewScore){
          case 1:
            setGrade({
              star_1: grade.star_1++
            })
            break;
          case 2:
            setGrade({
              star_2: grade.star_2++
            })
            break;
          case 3:
            setGrade({
              star_3: grade.star_3++
            })
            break;
          case 4:
            setGrade({
              star_4: grade.star_4++
            })
            break;
          case 5:
            setGrade({
              star_5: grade.star_5++
            })
            break;
        }
      }//End 리뷰점수 추가
  
  
      //평점 계산
      setAvg(Math.round((sum/review.length),3).toFixed(1));
      console.log("평점: "+avg);
  
      console.log("2점 개수: "+grade.star_2)
    }
  
    const [sum, setSum] = useState(0); //리뷰 점수 합

    const scrollEvent = useCallback(()=>{
      if(window.scrollY>0)  setIsScroll(true);
      else setIsScroll(false);
    });    
    useEffect(() => {
      getItem();
      getReview();
      getPicture();
      window.addEventListener('scroll', scrollEvent, true);
      return () =>{
        window.removeEventListener('scroll', scrollEvent, true);
      }
    }, []); // 마운트가 되었을 때만 호출

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  const [fullWidth, setFullWidth] = React.useState(true);
    if(!product) return null; 
  const handleCreateReview = () => {
    getReview();
  };
  const handleModifyReview = () => {
    getReview();
  };
  

  const onClickTopButton = () => {
    window.scroll({
      top:0,
      left:0,
      behavior:'smooth',
    })
  };
  const handleReviewGood = (id,val) => { 
    const tmp = review.map(item=>{
      if(item.reviewId===id){
        if(val===0) return {...item, helpMark:val, helpCnt:item.helpCnt-1};
        else return {...item, helpMark:val, helpCnt:item.helpCnt+1};
      }
      else return item;
    })
    setReview(tmp);
  };

    return (
      <div style={{position:'relative', paddingBottom:'180px', minHeight:'100vh'}}>
        <div className={styles.page}>
          <div className={styles.nav}>
            <Navbar/>
            <Logo type={1}/>
          </div>
            
            <Grid container spacing={4}>
            <Grid item xs={4} className={styles.detail}>
                <DetailLeft product={product} />
            </Grid>
            <Grid item xs={8} className={styles.detail}>
                <DetailRight product={product} />
            </Grid>
            <Grid item xs={12} className={styles.youtube}>
                
                {
                    selectedVideo && (
                        <Dialog style={{height:'100%',}} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                <DialogTitle  id="customized-dialog-title" onClose={handleClose}>
                                  <div className={styles.name}>
                                      <img className={styles.youtube_icon} src={process.env.PUBLIC_URL + '/images/youtube_icon.png'} alt="유튜브아이콘"/>
                                      <span className={styles.title}> 유튜브 재생 </span>   
                                  </div>
                                </DialogTitle>
                                <DialogContent dividers>
                                    <YoutubeDetail video={selectedVideo}/>
                                </DialogContent>
                            </Dialog>
                    )
                    
                }
                <Youtube videos={videos} onVideoClick={selectVideo}/>
            </Grid>
            <div className={styles.bar}></div>
            <Grid item xs={12} className={styles.review}>
                <Review 
                  product={product} 
                  review={review} 
                  picture={picture} 
                  onCreateReview={handleCreateReview} 
                  onModifyReview={handleModifyReview}
                  onClickReviewGood={handleReviewGood}
                />
            </Grid>
            </Grid>
        </div>
        {
          isScroll && <TopButton onClick={onClickTopButton}/>
        }
        <Footer/>
      </div>
    );
  }

// export default CosmeticDetail;
const mapStateToProps = (state) => ({
  user: state.user.user,
})
export default connect(
  mapStateToProps,
)(CosmeticDetail);
