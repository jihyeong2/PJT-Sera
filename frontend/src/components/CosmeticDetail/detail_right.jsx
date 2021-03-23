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
import Ingredient from './ingredient';

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

const Detail = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [fullWidth, setFullWidth] = React.useState(true);
    return(
        <div className={styles.detail_right}>
            <p className={styles.product_category}>스킨케어 세럼</p>
            <p className={styles.product_name}>프로바이오틱스 세라마이드 크림</p> 
            <p><span className={styles.volume}>60ml /  </span><span className={styles.price}>35,000원</span></p>
            <div className={styles.brand}>
                <span className={styles.brand_name}>마몽드 (Mamonde)</span>
                <Button className={styles.naver_go_btn} variant="outlined">
                <img className={styles.naver_icon} src={process.env.PUBLIC_URL + '/images/naver_icon.png'} alt="네이버아이콘"/>
                최저가 검색</Button>
                <Button className={styles.brand_go_btn} variant="outlined">브랜드몰 가기</Button>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.match_detail}>
                <Grid container spacing={1}>
                        <Grid item xs={2} >
                            <div className={styles.circle_percent}>80%</div>
                        </Grid>
                        <Grid item xs={7} >
                            <div className={styles.result}>
                                <br></br>
                                <span className={styles.test_result}>ORNT</span>인
                                <span className={styles.nickname}> 지니</span>님과 성분이
                                <span className={styles.test_percent}> 80%</span> 일치합니다.
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <br></br>
                            <Button className={styles.ingredient_btn} variant="outlined" onClick={handleClickOpen}>성분보기</Button>
                            <Dialog style={{height:'90%',}} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                    성분결과
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Ingredient />
                                </DialogContent>
                            </Dialog>
                        </Grid>
                    </Grid>
            </div>
            <div className={styles.bar}></div>
            <div className={styles.tone_detail}>
                <Grid container spacing={1}>
                    <Grid item xs={2} >
                        <div className={styles.tone_circle}>
                            <div>가을</div>
                            <div>웜</div>
                        </div>
                    </Grid>
                    <Grid item xs={7} >
                        <div className={styles.tone_result}>
                            <br></br>
                            <span className={styles.nickname}> 지니</span>님은 
                            <span className={styles.test_tone}> 가을웜톤</span> 입니다.
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <br></br>
                        <Button className={styles.tone_btn} variant="outlined" >정보보기</Button>
                        {/* <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                    퍼스널컬러 정보
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                    퍼스널컬러 정보
                                    </Typography>
                                </DialogContent>
                            </Dialog> */}
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
                            바를수록 건강해지는 유산균 발효용액 보습장벽 마일드 크림 <br />
                            - 플로랄 바이오틱스와 7겹 세라마이드의 촉촉 보습장벽 듀얼 이펙트 <br /> 
                            - 피부 속 보습은 촉촉하게 채우고 끈적임없이 가볍게 흡수 <br />
                            - 피부에 부담 없는 클린 마일드 포뮬라<br />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div> 
    );    
}

export default Detail;