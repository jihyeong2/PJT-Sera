import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styles from './UpdateForm.module.css';
import {connect} from 'react-redux';
import {update} from '../../../actions/index';
import {updateUser, checkName, deleteUser, requestCertify, getCertify} from '../../../service/user';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';

const UpdateForm = ({user,update}) => {
  const gender={'남':'male','여':'female'};
  const trueState=true;
  const falseState=false;
  const nickNameRef=useRef();
  const pwRef=useRef();
  const pwConfirmRef=useRef();
  const ageRef=useRef();
  const phoneRef=useRef();
  const certifyNumRef=useRef();
  const [userInfo,setUserInfo] = useState({...user});
  const [userPasswordConfirm,setPasswordConfirm] = useState(user.userPassword)
  const [isCheckedName, setIsCheckedName] = useState(true);
  const [certifyNum, setCertifyNum] = useState('');
  const [isClickedCertify, setIsClickedCertify] = useState(true);
  const [isCertified, setIscertified] = useState(true);
  const history = useHistory();
  const upperCase = /[A-Z]/; //대문자
  const lowerCase = /[a-z]/;
  const numberCase = /[0-9]/;
  const regKorean =  /^[ㄱ-ㅎ가-힣]+$/; //한글 정규식
  const RegExp =  /[~!@#$%^&*()_+|<>?:{}]/;//특수문자 정규식
  console.log(userInfo);
  const handleChange = (e)=>{
    if(e.target==null) return;
    e.preventDefault();
    let value='';
    switch (e.target.name){
      case 'userNickname':
        value=nickNameRef.current.value;
        setIsCheckedName(falseState);
        break;
      case 'userPassword':
        value=pwRef.current.value;
        break;
      case 'userPasswordConfirm':
        value=pwConfirmRef.current.value;
        break;
      case 'userAge':
        value=ageRef.current.value;
        break;
      case 'userPhone':
        value=phoneRef.current.value;
        if(value===user.userPhone){
          setIscertified(trueState);
          setIsClickedCertify(trueState);
        } else{
          setIscertified(falseState);
          setIsClickedCertify(falseState)
        }
        console.log(value);
        console.log(user.userPhone);
        console.log(isCertified,isClickedCertify)
        break;
      case 'certifyNum':
        value=certifyNumRef.current.value;
        break;
    }
    if(e.target.name==='certifyNum'){
      setCertifyNum(value);
    } else if(e.target.name === 'userPasswordConfirm'){
      setPasswordConfirm(value);
    } else{
      setUserInfo(userInfo=>{
        const updated={
          ...userInfo,
          [e.target.name]: value,
        }
        return updated;
      });
    }
  }
  const onReset = () => {
    if(userInfo.userGender!=user.userGender){
      document.querySelector(`#${gender[userInfo.userGender]}`).classList.toggle(styles.gender_button_active);
      document.querySelector(`#${gender[user.userGender]}`).classList.toggle(styles.gender_button_active);
    }
    setUserInfo({...user});
    setIsCheckedName(trueState);
    setIscertified(trueState);
    setIsClickedCertify(trueState);
    setCertifyNum('');
  };
  const onClickGender = (e) => {
    const beforeTarget = document.querySelector(`#${gender[userInfo.userGender]}`);
    const currTarget = document.querySelector(`#${e.target.id}`);
    beforeTarget.classList.toggle(styles.gender_button_active);
    currTarget.classList.toggle(styles.gender_button_active);
    setUserInfo(userInfo=>{
      const updated={
        ...userInfo,
        userGender:e.target.innerText,
      }
      return updated;
    });
    console.log(e.target.innerText)
  };
  const onClickCheck = () => {
    if(userInfo.userNickname=='' && userInfo.userNickname.length>6 && !RegExp.test(userInfo.userNickname)){
      Swal.fire({
        icon: 'error',
        text: '닉네임이 형식이 올바르지 않습니다.',
        showConfirmButton: false,
        timer: 2000
      });
      setIsCheckedName(falseState);
      return
    }
    checkName(
      userInfo.userNickname,
      (res)=>{
        console.log(res);
        if(userInfo.userNickname!=user.userNickname && res.data.data==="중복입니다"){
          Swal.fire({
            icon: 'error',
            text: '이미 존재하는 닉네임입니다.',
            showConfirmButton: false,
            timer: 2000
          })
          setIsCheckedName(falseState);
        }else{
          Swal.fire({
            icon: 'success',
            text: '사용 가능한 닉네임입니다.',
            showConfirmButton: false,
            timer: 2000
          });
          setIsCheckedName(trueState);
        }
      },
      (err)=>{
        console.error(err);
        setIsCheckedName(falseState);
      }
    )
  };
  const onClickPhone = () => {
    if(isCertified || user.userPhone === userInfo.userPhone){
      Swal.fire({
        icon: 'error',
        text: '이미 인증된 번호입니다.',
        showConfirmButton: false,
        timer: 2000
      })
    } else if(userInfo.userPhone === "" || upperCase.test(userInfo.userPhone) || lowerCase.test(userInfo.userPhone) || regKorean.test(userInfo.userPhone) || RegExp.test(userInfo.userPhone)){
      Swal.fire({
        icon: 'error',
        text: '휴대폰 번호 형식이 올바르지 않습니다.',
        showConfirmButton: false,
        timer: 2000
      })
    }
    else {
      requestCertify(
        userInfo.userPhone,
        (res)=>{
          console.log(res);
          if(res.data.status==="success"){
            Swal.fire({
              icon: 'success',
              text: `${userInfo.userPhone}의 번호로 인증번호가 발송되었습니다.`,
              showConfirmButton: false,
              timer: 2000
            });
            setIsClickedCertify(trueState);
          } else{
            setIsClickedCertify(falseState);
            Swal.fire({
              icon: 'error',
              text: `${userInfo.userPhone}의 번호로 인증번호 발송에 실패했습니다.`,
              showConfirmButton: false,
              timer: 2000
            });
          }
        },
        (err)=>{
          console.err(err);
          setIsClickedCertify(falseState);
          Swal.fire({
            icon: 'error',
            text: `${userInfo.userPhone}의 번호로 인증번호 발송에 실패했습니다.`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      )
    }
    
  };
  const onClickCertify = () => {
    getCertify(
      certifyNum,
      (res)=>{
        console.log(res);
        if(res.data.data!=="false"){
          Swal.fire({
            icon: 'success',
            text: '성공적으로 인증되었습니다.',
            showConfirmButton: false,
            timer: 2000
          });
          setIscertified(trueState);
        } else{
          Swal.fire({
            icon: 'error',
            text: `인증번호가 일치하지 않습니다.`,
            showConfirmButton: false,
            timer: 2000
          });
          setIscertified(falseState);
        }
      },
      (err)=>{
        console.err(err);
        Swal.fire({
          icon: 'error',
          text: `${userInfo.userPhone}의 번호로 인증번호 발송에 실패했습니다.`,
          showConfirmButton: false,
          timer: 2000
        });
        setIscertified(falseState);
      }
    );
  };
  const onSubmit = () => {
    if(!isCheckedName || userInfo.userNickname===''){
      Swal.fire({
        icon: 'error',
        text: '닉네임이 형식이 올바르지 않거나, 중복확인이 되지 않았습니다.',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    if(!isCertified){
      Swal.fire({
        icon: 'error',
        text: '휴대폰 인증이 되지 않았습니다.',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    if(userInfo.userPassword=='' || userPasswordConfirm =='' || userInfo.userPassword!=userPasswordConfirm || userInfo.userPassword.length<6 || userInfo.userPassword.length>15){
      Swal.fire({
        icon: 'error',
        text: '비밀번호가 형식이 올바르지 않거나, 일치하지 않습니다.',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    }
    updateUser(
      userInfo,
      (res)=>{
        console.log(res);
        if(res.data.data==="수정 성공"){
          Swal.fire({
            icon: 'success',
            text: '회원 정보가 수정되었습니다.',
            showConfirmButton: false,
            timer: 2000
          });
          update(userInfo);
        } else{
          Swal.fire({
            icon: 'error',
            text: '회원 정보 수정에 실패했습니다.',
            showConfirmButton: false,
            timer: 2000
          });
        }
      },
      (err)=>{
        console.error(err);
        Swal.fire({
          icon: 'error',
          text: '회원 정보 수정에 실패했습니다.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  };
  const onDelete = () =>{
    Swal.fire({
      title: '정말로 탈퇴하시겠습니까?',
      text: "탈퇴 후 모든 정보는 되돌릴 수 없습니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText:'아니오',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(
          user.userLoginId,
          (res)=>{
            if(res.data.status==="success"){
              Swal.fire(
                '탈퇴되었습니다.',
                '',
                'success'
              );
              history.push('/login');
            } else{
              Swal.fire(
                '탈퇴에 실패했습니다.',
                '',
                'error'
              );
            }
          },
          (err)=>{
            console.error(err);
          }
        )
      }
    })
  };
  useEffect(()=>{
    const btn = document.querySelector(`#${gender[userInfo.userGender]}`);
    btn.classList.toggle(styles.gender_button_active);
  },[]);
  return (
    <div className={styles.container}>
      <div className={styles.guide}>
        <span className={styles.highlight}> *</span>
        <span className={styles.text}>표시 항목은 반드시 입력해주세요.</span>
      </div>
      <div className={styles.table}>
        <div className={styles.table_row}>
          <div className={styles.label}>
            아이디
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            {userInfo.userLoginId}
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            닉네임
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input ref={nickNameRef} type="text" className={styles.input} name="userNickname" value={userInfo.userNickname} onChange={handleChange}/>
            <button className={styles.button} onClick={onClickCheck}>
              중복확인
            </button>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            비밀번호
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input ref={pwRef} type="password" className={styles.input} name="userPassword" value={userInfo.userPassword} onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            비밀번호 확인
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input ref={pwConfirmRef} type="password" className={styles.input} name="userPasswordConfirm" value={userPasswordConfirm} onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            나이
          </div>
          <div className={styles.value}>
            <input ref={ageRef} type="number" className={styles.input} name="userAge" value={userInfo.userAge} onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            휴대폰 번호
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value} style={{display:'flex', flexDirection:'column'}}>
            <div>
              <select name="" id="" className={styles.select}>
                <option className={styles.option} value="SKT">SKT</option>
                <option className={styles.option} value="KT">KT</option>
                <option className={styles.option} value="LG">LG</option>
              </select>
              <input ref={phoneRef} type="text" className={styles.input} name="userPhone" value={userInfo.userPhone} onChange={handleChange}/>
              <button className={styles.button} onClick={onClickPhone}>
                인증번호 발송
              </button>
            </div>
            {(!isCertified && isClickedCertify) &&
              <div style={{marginTop:'0.5em'}}>
                <input ref={certifyNumRef} type="text" className={styles.input} name="certifyNum" value={certifyNum} onChange={handleChange}/>
                <button className={styles.button} onClick={onClickCertify}>
                  인증하기
                </button>
              </div>
            }
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            성별
          </div>
          <div className={styles.value}>
            <button id="male" className={styles.gender_button} onClick={onClickGender}>남</button>
            <button id="female" className={styles.gender_button} onClick={onClickGender}>여</button>
          </div>
        </div>
      </div>
      <section className={styles.notice_box}>
        <div className={styles.notice_title}>
          비밀번호 변경 시 유의사항
        </div>
        <ul className={styles.notice_list}>
          <li className={styles.notice}>
            영문자, 숫자, 특수문자가 조합된 6~15 자리여야 합니다.
          </li>
          <li className={styles.notice}>
            아이디와 4자리 이상 동일하거나, 4자리 이상 반복되는 문자와 숫자는 사용이 불가합니다.
          </li>
          <li className={styles.notice}>
          사용 가능 특수문자 : !"#$%^&*+-/:;?@~
          </li>
        </ul>
      </section>
      <section className={styles.button_box}>
        <button className={styles.white_button} onClick={onReset}>원래대로</button>
        <button className={styles.black_button} onClick={onSubmit}>수정하기</button>
        <button onClick={onDelete} className={styles.red_button}>
          탈퇴하기&nbsp;
          <FontAwesomeIcon icon="chevron-right" size="lg" color="#EB0000"/>  
        </button>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
  update: user => dispatch(update(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateForm)