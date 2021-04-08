import React, { useEffect, useState } from 'react';
import styles from './review.module.css';
import styless from './review_item.module.css';
import Grid from '@material-ui/core/Grid';
import ReviewHead from './review_head';
import CreateIcon from '@material-ui/icons/Create';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination"; 
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ReviewModify from './review_modify_modal';
import http from "../../../http-common";
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';

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

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const theme = createMuiTheme();


const Review = ({product, review, user, skin, picture, onCreateReview, onModifyReview, onClickReviewGood, onDeleteReview, grade}) => {
    const [open, setOpen] = React.useState([]);
    useEffect(()=>{
        const tmp = new Array(review.length).fill(false);
        setOpen(tmp);
    },[review])
    const classes = useStyles();
    const [type, setType] = React.useState(1);

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
      });
    const [fullWidth, setFullWidth] = React.useState(true);


    const handleClickOpen = (e) => {
        const index = e.target.dataset.idx ? e.target.dataset.idx : e.target.parentNode.dataset.idx;
        const tmp = open.map((item,idx)=>{
            if(idx!=index) return item
            else return true
        })
        setOpen(tmp);
    };
    const handleClose = () => {
        const tmp = open.map((item,idx)=>{
            if(!item) return item
            else return false
        })
        setOpen(tmp);
    };

    const userLoginId = user.userLoginId;
    const help = (e) => {
        const index = e.target.dataset.idx ? e.target.dataset.idx : e.target.parentNode.dataset.idx;
        const reviewId = review[index].reviewId;
        http.put("v1/review/help", {
            reviewId, 
            userLoginId 
        })
        .then(res=>{     
            onClickReviewGood(reviewId,res.data.data);
        })
        .catch(err=>{
            console.error(err);
        })
    }
    const handleCreateReview = () => {
        onCreateReview();
    };
    const handleModifyReview = () => {
        handleClose();
        onModifyReview();
    }

    const [page, setPage] = useState(0);
    const handleClick = (offset) => {
        setPage(offset);
    }
    const handleDeleteReview = (e) => {
        const index = e.target.dataset.idx ? e.target.dataset.idx : e.target.parentNode.dataset.idx;
        const reviewId = review[index].reviewId;
        Swal.fire({
            title: '정말로 삭제하시겠습니까?',
            text: "당신의 리뷰는 소중합니다.😥",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText:'아니오',
          }).then((result) => {
            if (result.isConfirmed) {
                http.delete(`v1/review/${reviewId}`)
                .then(res =>{
                    if(res.data.status==="success"){
                        Swal.fire(
                          '삭제되었습니다.',
                          '',
                          'success'
                        );
                        onDeleteReview();
                      } else{
                        Swal.fire(
                          '삭제에 실패했습니다.',
                          '',
                          'error'
                        );
                      }
                }) 
                .catch(err=>{
                    console.error(err);
                })
            }
          })
    }

    
    return(
        <div>
            <div className={styles.review_title}>REVIEW</div>
            <ReviewHead product={product} grade={grade} onCreateReview={handleCreateReview}/>
            <div className={styles.bar}></div>
            <div style={{color:"#666666", marginLeft:"5%", marginTop:"40px", fontWeight:"600", fontSize:"20px"}}> 📸 최근 리뷰사진 List </div>
            <div className={styles.picture_list}>
                {
                    picture.length === 0 && (<div>사진리뷰가 없어요. 😥</div>)
                }
                
                {
                    picture.map (picture=> ( <img className={styles.review_image} key={picture.idx} src={picture} alt="리뷰사진"/>))
                }
                
            </div>
            
            
            <div className={styles.review_list}>
                {
                    review.slice(page,page+5).map ((review,idx) => ( 
                        <div className={styless.item} key={review.reviewId}>
                            <div className={styless.review_item} >
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        <div className={styless.review_pro}>
                                            <div className={styless.title_pro}>
                                                <span className={styless.nickname}>{review.user.userNickname}</span>
                                                <span className={styless.prof}>
                                                    <span> {review.user.userGender}</span>/ 
                                                    <span>{review.user.userAge}</span>
                                                </span>
                                                
                                            </div>
                                            <div className={styless.circle} >
                                                <div className={styless.skin_type} style={{color:`${skin.type[review.user.skinDto.skinType].color}`,border:`3px solid ${skin.type[review.user.skinDto.skinType].color}`, borderRadius:`50%`}} >
                                                    {review.user.skinDto.skinType}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={styless.review_content}>
                                            <div>
                                                <Box className={styless.star_rate} component="fieldset" mb={3} borderColor="transparent">
                                                    <Rating name="read-only" value={review.reviewScore} readOnly />
                                                </Box>
                                                <span className={styles.date}>{ moment(review.writeDate).format('YYYY-MM-DD')}</span> &nbsp;
                                                {
                                                    review.user.userNickname == user.userNickname && (
                                                        <>
                                                            <CreateIcon fontSize="small" className={styless.change_icon} onClick={handleClickOpen} data-idx={page+idx}/>
                                                            <Dialog style={{ height: '90%', }} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open[page+idx]}  >
                                                                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                                    리뷰수정
                                                                    </DialogTitle>
                                                                    <DialogContent dividers>
                                                                        <ReviewModify product={product} reviewOrigin={review} index={page+idx} onModifyReview={handleModifyReview}/>
                                                                    </DialogContent>
                                                            </Dialog>
                                                            <DeleteIcon fontSize="small" className={styless.trash_icon} onClick={handleDeleteReview} data-idx={page+idx}/>
                                                        </>
                                                    )
                                                }
                                            </div>
                                            <div className={styless.good_review}>
                                                <div className={styless.good}>
                                                    <MoodIcon className={styless.good_icon}/>좋았던 점 
                                                </div>
                                                <div className={styless.good_content}>
                                                   {review.reviewGoodContent}
                                                </div>
                                            </div>
                                            <div className={styless.good_review}>
                                                <div className={styless.bad}>
                                                    <MoodBadIcon className={styless.bad_icon}/>아쉬운 점 
                                                </div>
                                                <div className={styless.bad_content}>
                                                {review.reviewBadContent}
                                                </div>
                                            </div>
                                            {
                                                (review.reviewImg != null && review.reviewImg != "" ) && (
                                                    <img className={styless.review_image} src={review.reviewImg} alt="리뷰사진2"/>
                                                )
                                            }
                                            
                                        </div>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <div>
                                            {
                                                review.helpMark >= 1 && (
                                                    <>
                                                        <ThumbUpIcon className={styless.like_icon} style={{color:"#616BAD"}} onClick={help} data-idx={page+idx} />
                                                        <div className={styless.des}>
                                                            <span className={styless.help}>도움 </span>(<span>{review.helpCnt}</span>)
                                                        </div>
                                                    </>
                                                )
                                            }
                                            {
                                                review.helpMark == 0 && (
                                                    <>
                                                        <ThumbUpIcon className={styless.like_icon} style={{color:"#999999"}} onClick={help} data-idx={page+idx} />
                                                        <div className={styless.des}>
                                                            <span className={styless.help}>도움 </span>(<span>{review.helpCnt}</span>)
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                        </div>))
                }
                
            </div>
            <div className={styles.pagenation} style={{display:'flex', justifyContent:'center'}}>
                <MuiThemeProvider theme={theme}>
                    <Pagination
                        limit={5}
                        offset={page}
                        total={review.length}
                        onClick={(e,offset) => handleClick(offset)}
                        currentPageColor={"secondary"}
                        otherPageColor={"default"}
                    />
                </MuiThemeProvider>
            </div>
            
        </div>
    );
}

// export default Review;
const mapStateToProps = (state) => ({
    user: state.user.user,
    skin : state.skin 
  })
  export default connect(
    mapStateToProps,
  )(Review);