import React from 'react';
import styles from './SkinType.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '../../assets/skin_main.PNG';
import Navbar from '../../components/common/Navbar/Navbar';
import { useHistory } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
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
const SkinType = (props) => {
  const trueState=true;
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const history = useHistory();
  const handleClose = () => {
    setOpen(false);
  };  
  const onClickTest = () => {
    history.push('/skin/survey');
  };
  const onClickSkip = () => {
    history.push('/skin/type');
  };
  const onClickHelp = () => {
    setOpen(true);
  };
  return(
    <div style={{width:'100vw',height:'100vh', overflow:"hidden"}}>
      <img className={styles.background} src={img} alt=""/>
      {/* <div style={{width:'80%'}}>
        <Navbar white={trueState}/>
      </div> */}
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>SKIN TYPE</span>
            <br/>
            <span>QUIZ</span>
          </div>
          <div className={styles.subtitle}>
            <span>바우만 피부타입 분석 프로세스</span>
          </div>
          <div className={styles.subtitle2}>
            <span>16가지 진단 결과</span>&nbsp;|&nbsp;
            <span>약 5분 소요</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <button onClick={onClickTest} className={styles.test_btn}>테스트 하러가기</button>
          <button onClick={onClickSkip} className={styles.skip_btn}>SKIP >></button>
          <button onClick={onClickHelp} className={styles.help_btn}>
            도움말
            <FontAwesomeIcon icon="question-circle" size="sm" color="#FFFFFF"/>      
          </button>
          <Dialog style={{height:'100%',}} fullWidth={fullWidth} maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}/>
              <DialogContent>
                <div className={styles.modal_container}>
                  <Grid container>
                    <Grid item xs={6}>
                      <div style={{position:'relative'}}>
                        <div className={styles.c1}>바우만 피부타입<br/>테스트</div>
                        <div className={styles.c2}>오일지수<br/>진단</div>
                        <div className={styles.c3}>민감성<br/>진단</div>
                        <div className={styles.c4}>색소성<br/>진단</div>
                        <div className={styles.c5}>주름<br/>진단</div>
                      </div>
                    </Grid>
                    <Grid item xs={6}>

                    </Grid>
                  </Grid>
                </div>
              </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SkinType;