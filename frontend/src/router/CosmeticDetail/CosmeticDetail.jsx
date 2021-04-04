import React, { Component, useEffect, useState } from 'react';
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
import axios from "axios";

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

const CosmeticDetail = () => {
    const [product, setProduct] = useState(null);

    const getItem = () => {
        axios({
            method: 'GET',
            url: `http://localhost:8000/v1/items/4`,
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
            fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${res.data.item_name}&type=video&order=viewCount&maxResults=8&key=AIzaSyAIAN4fWbhQxYcuLU-cnjAGihX695m5azE`, requestOptions)
            .then(response => response.json()) // 보기좋은 json 형식
            .then(result => result.items.map(item => ({...item, id:item.id.videoId}))) // 그대로 하는데 id만 object가 아니라 videoId로 덮어주는 작업
            .then(items => setVideos(items)) // 그 비디오 아이템들로 업뎃
            .catch(error => console.log('error', error));
            console.log("dha?")
          console.log(product);
          })
          .catch(err=>{
              console.log("에러");
            console.error(err);
          })
    }
      
    

    const [videos, setVideos] = useState([]);
    // const reviews;
    const [selectedVideo, setSelectedVideo] = useState(null);
    const selectVideo = (video) => {
        setOpen(true);
        setSelectedVideo(video); // 선택된 비디오로 업뎃 
    };
    // const onCreateReview = (val) => {
      
    // }
    // const onChangeReview = (reviewId,val) => {

    //   set
    // }
    useEffect(() => {
      getItem();
    }, []); // 마운트가 되었을 때만 호출

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  
    const [fullWidth, setFullWidth] = React.useState(true);
    if(!product) return null; 

    return (
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
                {/* <Review onCreateReview={onCreateReview}/> */}
                <Review />
            </Grid>
            </Grid>
        </div>
    );
  }

export default CosmeticDetail;
