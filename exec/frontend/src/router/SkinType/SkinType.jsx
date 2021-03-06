import React from 'react';
import styles from './SkinType.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '../../assets/skin_main.PNG';
import { useHistory } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import baubau from '../../assets/baubau.png';
import {connect} from 'react-redux';
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
const SkinType = ({user}) => {
  let historys = useHistory();
  if(user == null){
    Swal.fire({
      icon: 'error',
      text: '로그인 후 이용해주세요',
      confirmButtonText: '확인',
    }).then(() => {
      historys.push("/login");
    })
  }

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
                  <div className={styles.baubau}>
                    <img src={baubau} alt=""/>
                  </div>
                  <div className={styles.bau_desc}>
                    <div className={[styles.bau_title, styles.bold_text].join(' ')}>
                      "바우만 피부타입 테스트"
                    </div>
                    <div className={styles.bau_content}>
                      미국 마이애미 대학교수인 레슬리 바우만 박사는
                      <span className={styles.bold_text}>오일지수 진단, 민감성 진단, 색소 진단, 주름 및 탄력 집단</span>을 통해
                      새로운 16가지의 피부 유형을 제시했습니다.
                    </div>
                    <div className={styles.bau_content}>
                      이는 피부 교과서에도 실린 분류법으로
                      가장 과학적인 피부타입 분류법으로 인정받고 있고,&nbsp;
                      <span className={styles.highlight}>SERA</span>는 바우만 피부타입 테스트를 응용하여
                      피부타입 테스트를 제공합니다.
                    </div>
                  </div>
                </div>
              </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

// export default SkinType;
const mapStateToProps = (state) => ({
  user: state.user.user,
})

export default connect(
  mapStateToProps,
)(SkinType)