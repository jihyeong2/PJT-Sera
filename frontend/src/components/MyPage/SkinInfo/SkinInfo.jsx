import React, {useState} from 'react';
import styles from './SkinInfo.module.css';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import SkinHexagon from '../../common/SkinHexagon/SkinHexagon';
import SkinHexagonInfo from '../../common/SkinHexagon/SkinHexagonInfo';
import { Grid } from '@material-ui/core';
import {update} from '../../../actions/index';
import Swal from 'sweetalert2';
import setSkin from '../../../service/skin';
import setColor from '../../../service/color';

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
const SkinInfo = ({user,skin,color,update}) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [currTag,setCurrTag] = useState(user.skinId!==null ? user.skinId.skinType : 'OSPT');
  const [clickedColor,setClickedColor] = useState(user.personalColor);
  const onChangeTag2 = (tag) => {
    setCurrTag(tag);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const onSubmitSkin = () => {
    setSkin(
      user.userLoginId,
      currTag,
      (res)=>{
        if (res.data.data ==="성공"){
          const tmp = {...user};
          tmp.skinId={
            skinId:skin.type[currTag].id,
            skinType:currTag
          }
          update(tmp);
          handleClose();
          Swal.fire({
            icon: 'success',
            text: '피부타입이 변경되었습니다.',
            showConfirmButton: false,
            timer: 2000
          });
        }
        else{
          handleClose();
          Swal.fire({
            icon: 'error',
            text: '수정에 실패했습니다.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      (err)=>{
        console.error(err);
        handleClose();
        Swal.fire({
          icon: 'error',
          text: '수정에 실패했습니다.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );

  };
  const onClickColor = (e) => {
    setClickedColor(e.target.innerText);
  };
  const onSubmitColor = () => {
    setColor(
      user.userLoginId,
      clickedColor,
      (res)=>{
        if(res.data.data==="성공"){
          const tmp = {...user};
          tmp.personalColor=clickedColor;
          update(tmp);
          handleClose2();
          Swal.fire({
            icon: 'success',
            text: '퍼스널컬러가 변경되었습니다.',
            showConfirmButton: false,
            timer: 2000
          });          
        } else{
          handleClose2();
          Swal.fire({
            icon: 'error',
            text: '수정에 실패했습니다.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      (err)=>{
        console.error(err);
        handleClose2();
        Swal.fire({
          icon: 'error',
          text: '수정에 실패했습니다.',
          showConfirmButton: false,
          timer: 2000
        });        
      }
    )
  };
  return (
    <div className={styles.container}>
      <section className={styles.info_box}>
        <div className={styles.info_left}>
          <div className={styles.username}>
            <span className={styles.name}>{user.userNickname}</span>
            님의 피부타입
          </div>
          <div className={styles.user_info}>{user.userGender} | {user.userAge}</div>
          {user.skinId &&           
            <ul className={styles.skin_box}>
              <div className={styles.skin_info1}>
                {user.skinId.skinType[0] === 'O' ?
                  <span className={styles.skin_text}>지성</span> :
                  <span className={styles.skin_text}>건성</span>
                }
              </div>
              <div className={styles.skin_info2}>
                <span className={styles.skin_text}>민감</span>
                {user.skinId.skinType[1] === 'R' ?
                  <span className={styles.skin_arrow}>↓</span> :
                  <span className={styles.skin_arrow}>↑</span>
                }
              </div>
              <div className={styles.skin_info3}>
                <span className={styles.skin_text}>색소</span>
                {user.skinId.skinType[2] === 'N' ?
                  <span className={styles.skin_arrow}>↓</span> :
                  <span className={styles.skin_arrow}>↑</span>
                }
              </div>
              <div className={styles.skin_info4}>
                <span className={styles.skin_text}>주름</span>
                {user.skinId.skinType[3] === 'T' ?
                  <span className={styles.skin_arrow}>↓</span> :
                  <span className={styles.skin_arrow}>↑</span>
                }
              </div>
            </ul>
          }

        </div>
        <div className={styles.info_right}>
          {
            user.skinId !==null ? 
            <div className={styles.skin_type} style={{border:`2px solid ${skin.type[user.skinId.skinType].color}`,color:`${skin.type[user.skinId.skinType].color}`}}>
              {user.skinId.skinType}
            </div>
            : <div className={styles.skin_type} >피부 Test</div>
          }
          <button className={styles.edit_btn} onClick={handleClickOpen}>
            <FontAwesomeIcon icon="edit" size="lg" color="#707070"/>      
          </button>
          <Dialog style={{height:'100%',}} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose}/>
              <DialogContent>
                <div className={styles.modal_container}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Grid
                        container
                        direction="column"
                      >
                      <div className={styles.modal_header}>
                        <div>
                          <FontAwesomeIcon icon="edit" size="lg" color="#FD6C1D"/>
                        </div>
                        <div className={styles.modal_box}>
                          <div className={styles.modal_title}>피부타입 수정</div>
                          <div className={styles.modal_subtitle}>원하는 피부타입으로 수정이 가능합니다.</div>
                        </div>
                      </div>
                      <SkinHexagon onChangeTag2={onChangeTag2}/>
                      </Grid>
                    </Grid>
                    <Grid item xs={4}>
                      <SkinHexagonInfo currTag={currTag}/>
                    </Grid>
                  </Grid>
                  <div className={styles.submit_box}>
                    <button onClick={onSubmitSkin} className={styles.submit_btn}>수정 완료</button>
                  </div>
                </div>
              </DialogContent>
          </Dialog>
          {
            user.personalColor!=null ? 
            <div className={styles.color_type} style={{backgroundColor:`${color[user.personalColor].color}`}}>
              {user.personalColor}
            </div> :
            <div className={styles.color_type}>컬러 Test</div>
          }
          
          <button className={styles.edit_btn} onClick={handleClickOpen2}>
            <FontAwesomeIcon icon="edit" size="lg" color="#707070"/>
          </button>
          <Dialog style={{height:'100%',}} fullWidth={fullWidth} maxWidth="lg" onClose={handleClose2} aria-labelledby="customized-dialog-title" open={open2}>
              <DialogTitle id="customized-dialog-title" onClose={handleClose2}/>
              <DialogContent>
                <div className={styles.modal_container}>
                  <div className={styles.modal_header}>
                    <div>
                      <FontAwesomeIcon icon="edit" size="lg" color="#FD6C1D"/>
                    </div>
                    <div className={styles.modal_box}>
                      <div className={styles.modal_title}>퍼스널컬러 수정</div>
                      <div className={styles.modal_subtitle}>원하는 퍼스널 컬러로 수정이 가능합니다.</div>
                    </div>
                  </div>                  
                  <Grid container spacing={3}>
                    {
                      Object.keys(color).map(key=>{
                        return(
                          <Grid key={key} item xs={3}>
                            <div onClick={onClickColor} className={styles.color_type} style={{backgroundColor:`${color[key].color}`, marginBottom:'2em', cursor:'pointer'}}>
                              {key}
                            </div>
                          </Grid>
                        )
                      })
                    }
                    <Grid item xs={4}>
                    </Grid>
                  </Grid>
                  <div className={styles.submit_box}>
                    <button onClick={onSubmitColor} className={styles.submit_btn}>수정 완료</button>
                  </div>
                </div>
              </DialogContent>
          </Dialog>
        </div>
      </section>
      
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user.user,
  skin: state.skin,
  color: state.color,
})

const mapDispatchToProps = (dispatch) => ({
  update: (user) => dispatch(update(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkinInfo);