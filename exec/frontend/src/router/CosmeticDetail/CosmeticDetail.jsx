import React, { useEffect, useState, useCallback } from 'react';
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
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

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
    let history = useHistory();
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
            setProduct(res.data);

            const requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${res.data.item_name}&type=video&order=viewCount&maxResults=8&key=AIzaSyAtjCXrIEz4k2kainW4AWnqwaeiX-LV7cw`, requestOptions)
            .then(response => response.json()) // 보기좋은 json 형식
            .then(result => result.items.map(item => ({...item, id:item.id.videoId}))) // 그대로 하는데 id만 object가 아니라 videoId로 덮어주는 작업
            .then(items => setVideos(items)) // 그 비디오 아이템들로 업뎃
            .catch(error => console.log('error', error));
          })
          .catch(err=>{
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
            console.log(res.data.data);
            setPicture(res.data.data);
          })
          .catch(err=>{
            console.error(err);
          })
    }
    const [grade, setGrade] = useState({ //리뷰차트
      star_sum: 0,
      star_cnt: 0,
      star_avg: 0,
      star_5: 0,
      star_4: 0,
      star_3: 0,
      star_2: 0,
      star_1: 0
    })
    const getGrade = (a) => { //리뷰 차트 계산
      var star_sum = 0;
      var star_cnt = 0;
      var star_avg = 0;
      var star_5 = 0;
      var star_4 = 0;
      var star_3 = 0;
      var star_2 = 0;
      var star_1 = 0;

      for(var r in a){
        star_sum += a[r].reviewScore;
        star_cnt++;
        switch(a[r].reviewScore){
          case 1:
            star_1++;
            break;
          case 2:
            star_2++;
            break;
          case 3:
            star_3++;
            break;
          case 4:
            star_4++;
            break;
          case 5:
            star_5++;
            break;
        }
      }//End 리뷰점수 추가
  
      //평점 계산
      setGrade({
        star_sum: star_sum,
        star_cnt: star_cnt,
        star_avg: star_sum>0 ? (star_sum/star_cnt).toFixed(2) : 0,
        star_5: star_5,
        star_4: star_4,
        star_3: star_3,
        star_2: star_2,
        star_1: star_1
      });
    }

    const scrollEvent = useCallback(()=>{
      if(window.scrollY>0)  setIsScroll(true);
      else setIsScroll(false);
    });    
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
      }else{
        getItem();
        getReview();
        getPicture();
        window.addEventListener('scroll', scrollEvent, true);
        return () =>{
          window.removeEventListener('scroll', scrollEvent, true);
        }
      }
    }, []); // 마운트가 되었을 때만 호출

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
  const [fullWidth, setFullWidth] = React.useState(true);
    if(!product) return null; 
  const handleCreateReview = () => {
    getPicture();
    getReview();
  };
  const handleModifyReview = () => {
    getPicture();
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
  const handleDeleteReview = () => {
    getReview();
    getPicture();
  }
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
                  onDeleteReview={handleDeleteReview}
                  onClickReviewGood={handleReviewGood}
                  grade={grade}
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
