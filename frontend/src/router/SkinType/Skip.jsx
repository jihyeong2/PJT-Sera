import React, {useState} from 'react';
import styles from './Skip.module.css';
import {connect} from 'react-redux';
import SkinHexagon from '../../components/common/SkinHexagon/SkinHexagon';
import SkinHexagonInfo from '../../components/common/SkinHexagon/SkinHexagonInfo';
import { Grid } from '@material-ui/core';
import Navbar from '../../components/common/Navbar/Navbar';
import Logo from '../../components/common/Logo/Logo';
import Footer from '../../components/common/Footer/Footer';
import setSkin from '../../service/skin';
import Swal from 'sweetalert2';
import {update} from '../../actions/index';
import { useHistory } from 'react-router';

const Skip = ({user,skin,update}) => {
  const [currTag,setCurrTag] = useState("OSPT");
  const history = useHistory();
  const onClickType = (tag) => {
    setCurrTag(tag);
  }
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
          Swal.fire({
            icon: 'success',
            text: `${user.userNickname}님의 피부타입은 ${currTag}입니다.`,
            showConfirmButton: false,
            timer: 1500
          });
          history.push("/skin/result");
        }
        else{
          Swal.fire({
            icon: 'error',
            text: '피부타입이 선택되지 않았습니다.',
            showConfirmButton: false,
            timer: 1500
          });
          history.push("/skin");
        }
      },
      (err)=>{
        console.error(err);
        Swal.fire({
          icon: 'error',
          text: '피부타입이 선택되지 않았습니다.',
          showConfirmButton: false,
          timer: 1500
        });
        history.push("/skin");
      }
    );

  }
  return(
    <div>
      <div className={styles.container}>
        <Navbar/>
        <Logo type={1}/>
        <Grid container style={{flexWrap:'nowrap'}}>
          <Grid item xs={8}>
            <Grid
              container
              direction="column"
            >
            <div className={styles.header}>
              <div className={styles.box}>
                <div className={styles.title}>피부타입 선택</div>
                <div className={styles.subtitle}>당신이 알고있는 타입을 하나 선택하세요.</div>
              </div>
            </div>
            <SkinHexagon onChangeTag2={onClickType}/>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <SkinHexagonInfo currTag={currTag}/>
          </Grid>
        </Grid>
        <div className={styles.submit_box}>
          <button onClick={onSubmitSkin} className={styles.submit_btn}>선택 완료</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  skin: state.skin,
})

const mapDispatchToProps = (dispatch) => ({
  update: (user) => dispatch(update(user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skip);