import React from 'react';
import styles from './detail.module.css';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Ingredient from '../ingredient/ingredient';
import PersonalColor from '../personal_color/personal_color';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {connect} from 'react-redux';
// import ReviewModify from '../review/review_modify_modal';

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

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const Detail = ({user, color, skin, product}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [opens, setOpens] = React.useState(false);

    const handleClickOpens = () => {
        setOpens(true);
    };
    const handleCloses = () => {
        setOpens(false);
    };
    const [fullWidth, setFullWidth] = React.useState(true);

    

        const naver = () => {
            window.open(`https://search.shopping.naver.com/search/all?query=${product.item_name}&cat_id=&frm=NVSHAKW`);
        };

    return (
        <div className={styles.detail_right}>
            <p className={styles.product_category}>{product.category_large}
            <ArrowForwardIosIcon fontSize="small" /> {product.category_middle} </p>
            <p className={styles.product_name}>{product.item_name}</p> 
            <p><span className={styles.volume}>{product.item_volume} /  </span><span className={styles.price}>{product.item_price}</span></p>
            <div className={styles.brand}>
                <span className={styles.brand_name}>{product.item_brand}</span>
                <Button className={styles.naver_go_btn} variant="outlined" onClick={naver}>
                    <img className={styles.naver_icon} src={process.env.PUBLIC_URL + '/images/naver_icon.png'} alt="네이버아이콘" />
                최저가 검색</Button>
            </div>
            <div className={styles.bar}></div>
                <div className={styles.match_detail}>
                <Grid container spacing={1}>
                        <Grid item xs={2} >
                            {product.rating<0 && <div style={{backgroundColor:'#AF3131'}} className={styles.circle_percent}></div>}
                            {product.rating>0 && <div style={{backgroundColor:'#4E9157'}} className={styles.circle_percent}>👍🏻</div>}
                            {product.rating==0 && <div style={{backgroundColor:'#FAC56A'}} className={styles.circle_percent}>🤏🏻</div>}
                        </Grid>
                        <Grid item xs={7} >
                            <div className={styles.result}>
                                <br></br>
                                <span style={{color:`${skin.type[user.skinId.skinType].color}`}} className={styles.test_result}>{user.skinId.skinType}</span>인
                                <span className={styles.nickname}>{user.userNickname}</span>님과
                                {product.rating<0 && <span className={styles.test_percent}> 잘 맞지 않아요 👎🏻</span> }
                                {product.rating>0 && <span className={styles.test_percent}> 잘 맞아요 👍🏻</span> }
                                 {product.rating==0 && <span className={styles.test_percent}> 보통이에요 🤏🏻</span> }
                            </div>
                    </Grid>
                    <Grid item xs={3}>
                        <br></br>
                        <Button className={styles.ingredient_btn} variant="outlined" onClick={handleClickOpen}>성분보기</Button>
                        <Dialog style={{ height: '90%', }} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                성분결과
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Ingredient product={product} />
                                </DialogContent>
                            </Dialog>
                        </Grid>
                    </Grid>
                </div>
            
            <div className={styles.bar}></div>
                <div className={styles.tone_detail}>
                    <Grid container spacing={1}>
                        <Grid item xs={2} >
                            {
                                user.personalColor.split('')[0] == "봄" && (
                                    <div style={{backgroundColor:`${color[user.personalColor].color}`}} className={styles.tone_circle}>
                                        <div>{user.personalColor.split('')[0]}</div>
                                        <div>{user.personalColor.split('')[1]}</div>
                                    </div>
                                )
                            }
                            {
                                user.personalColor.split('')[0] != "봄" && (
                                    <div style={{backgroundColor:`${color[user.personalColor].color}`}} className={styles.tone_circle}>
                                        <div>{user.personalColor.split(' ')[0]}</div>
                                        <div>{user.personalColor.split(' ')[1]}</div>
                                    </div>
                                )
                            }
                        </Grid>
                        <Grid item xs={7} >
                            <div className={styles.tone_result}>
                                <br></br>
                                <span className={styles.nickname}> {user.userNickname}</span>님은 
                                <span style={{color:`${color[user.personalColor].color}`}} className={styles.test_tone}>{user.personalColor}톤</span> 입니다.
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <br></br>
                            <Button className={styles.tone_btn} variant="outlined" onClick={handleClickOpens}>정보보기</Button>
                            <Dialog style={{ height: '90%', }} fullWidth={fullWidth} maxWidth="lg" onClose={handleCloses} aria-labelledby="customized-dialog-title" open={opens}>
                                <DialogTitle id="customized-dialog-title" onClose={handleCloses}>
                                    퍼스널컬러 정보
                                    </DialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        <PersonalColor />
                                    </Typography>
                                </DialogContent>
                            </Dialog>
                        </Grid>
                    </Grid>
                </div>
            <div className={styles.bar}></div>
            <div className={styles.detail}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <div className={styles.description_name}> 설명 </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className={styles.description_content}>
                            {product.item_description}
                        </div>
                    </Grid>

                    { product.tags != null && 
                        <>
                        <Grid item xs={2}>
                            <div className={styles.description_name}> 태그 </div>
                        </Grid>
                        <Grid item xs={10}>
                            <div className={styles.description_content}>
                                {
                                    product.tags.map (tag=> ( <div className={styles.tag} key={product.id}>{tag}</div>))
                                }
                            </div>
                        </Grid>
                        </>
                    }
                </Grid>
            </div>
        </div>
    );
}

// export default Detail;
const mapStateToProps = (state) => ({
    user: state.user.user,
    color: state.color,
    skin : state.skin 
  })
  export default connect(
    mapStateToProps,
  )(Detail);