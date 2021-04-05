import React from 'react';
import styles from './review.module.css';
import styless from './review_item.module.css';
import Grid from '@material-ui/core/Grid';
import ReviewHead from './review_head';
import CreateIcon from '@material-ui/icons/Create';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
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


// const Review = ({onCreateReview}) => {
const Review = ({product, review, user, skin}) => {
    // console.log("리뷰 넘어왔니? "+review);
    // console.log(review[0]);
    // console.log(review[3]);
    // console.log(review[5]);
    
    const classes = useStyles();
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
      })
    const handleChange_radio = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    // const onCreateReview = (val) =>{
    //     onCreateReview(val);
    // }
    // const [value, setValue] = React.useState(2);

    const [fullWidth, setFullWidth] = React.useState(true);
    // console.log(review.length);
    const [open, setOpen] = React.useState(Array(review.length).fill(false));
    // console.log(open);
    const handleClickOpen = (e) => {
        // console.log(e);
        const index = e.target.dataset.idx ? e.target.dataset.idx : e.target.parentNode.dataset.idx;
        // console.log(index);
        const tmp = open.map((item,idx)=>{
            if(idx!=index) return item
            else return true
        })
        console.log(tmp);
        setOpen(tmp);
    };
    const handleClose = () => {
        const tmp = open.map((item,idx)=>{
            if(!item) return item
            else return false
        })
        setOpen(tmp);
    };

    return(
        <div>
            <div className={styles.review_title}>REVIEW</div>
            {/* <ReviewHead onCreateReview={onCreateReview}/> */}
            <ReviewHead product={product} />
            <div className={styles.bar}></div>
            <div className={styles.filtering}>
                <div className={styles.right_check}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">정렬기준</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        
                        onChange={handleChange}
                        >
                            <MenuItem value={1}>최신순</MenuItem>
                            <MenuItem value={2}>별점순</MenuItem>
                            <MenuItem value={3}>도움이된순</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className={styles.picture_list}>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
            </div>
            <div className={styles.review_list}>
                {
                    review.map ((review,idx) => ( 
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
                                                {
                                                    review.user.skinDto != null  && ( // 유저 피부타입 넣어달라고 하고 조건 빼기 🎈
                                                        <div className={styless.skin_type} style={{color:`${skin.type[review.user.skinDto.skinType].color}`,border:`3px solid ${skin.type[review.user.skinDto.skinType].color}`, borderRadius:`50%`}} >
                                                        {review.user.skinDto.skinType}
                                                        </div>
                                                    )
                                                }
                                                
                                            </div>
                                            
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={styless.review_content}>
                                            <div>
                                                <Box className={styless.star_rate} component="fieldset" mb={3} borderColor="transparent">
                                                    <Rating name="read-only" value={4} readOnly />
                                                </Box>
                                                <span className={styles.date}>{ moment(review.writeDate).format('YYYY-MM-DD')}</span>
                                                <CreateIcon fontSize="small" className={styless.change_icon} onClick={handleClickOpen} data-idx={idx}/>
                                                <Dialog style={{ height: '90%', }} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open[idx]}>
                                                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                        리뷰수정
                                                        </DialogTitle>
                                                        <DialogContent dividers>
                                                            <ReviewModify product={product} reviewOrigin={review} index={idx} />
                                                        </DialogContent>
                                                </Dialog>
                                                <DeleteIcon fontSize="small" className={styless.trash_icon}/>
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
                                                review.reviewImg != "" && (
                                                    <img className={styless.review_image} src={review.reviewImg} alt="리뷰사진2"/>
                                                )
                                            }
                                            
                                        </div>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <div>
                                            {
                                                review.helpMark == 1 && (
                                                    <ThumbUpIcon className={styless.like_icon} style={{color:"#616BAD"}} />
                                                )
                                            }
                                            {
                                                review.helpMark == 0 && (
                                                    <ThumbUpIcon className={styless.like_icon} style={{color:"#999999"}} />
                                                )
                                            }
                                        </div>
                                        <div className={styless.des}>
                                        <span className={styless.help}>도움 </span>(<span>{review.helpCnt}</span>)
                                        </div>
                                    
                                    </Grid>
                                </Grid>
                            </div>

                        </div>))
                }
                
            </div>
            <div className={styles.pagenation}>
                <Pagination className={styles.pagenation} count={10} shape="rounded" />
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