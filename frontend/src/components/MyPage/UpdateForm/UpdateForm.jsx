import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import styles from './UpdateForm.module.css';
import {connect} from 'react-redux';
import {login, logout, update} from '../../../actions/index';

const UpdateForm = ({user,login,logout,update}) => {
  console.log(user);
  let [userInfo,setUserInfo] = useState({...user});
  const nickNameRef=useRef();
  const pwRef=useRef();
  const pwConfirmRef=useRef();
  const ageRef=useRef();
  const phoneRef=useRef();
  // const genderRef=useRef();
  const handleChange = (e)=>{
    if(e.target==null) return;
    e.preventDefault();
    let value='';
    switch (e.target.name){
      case 'nickName':
        value=nickNameRef.current.value;
        break;
      case 'pw':
        value=pwRef.current.value;
        break;
      case 'pwConfirm':
        value=pwConfirmRef.current.value;
        break;
      case 'age':
        value=ageRef.current.value;
        break;
      case 'phone':
        value=phoneRef.current.value;
        break;
    }
    setUserInfo(userInfo=>{
      const updated={
        ...userInfo,
        [e.target.name]: value,
      }
      return updated;
    });
  }
  const onReset = () => {
    setUserInfo({...user});
  };
  const onSubmit = (e) => {
    update(userInfo);
  };
  const onClickGender = (e) => {
    const beforeTarget = document.querySelector(`#${userInfo.gender}`);
    const currTarget = document.querySelector(`#${e.target.id}`);
    beforeTarget.classList.toggle(styles.gender_button_active);
    currTarget.classList.toggle(styles.gender_button_active);
    setUserInfo(userInfo=>{
      const updated={
        ...userInfo,
        gender:e.target.id,
      }
      return updated;
    });
  }
  const onClickCheck = () => {

  };
  const onClickPhone = () => {

  };
  useEffect(()=>{
    const btn = document.querySelector(`#${userInfo.gender}`);
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
            {userInfo.userId}
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            닉네임
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input ref={nickNameRef} type="text" className={styles.input} name="nickName" value={userInfo.nickName} onChange={handleChange}/>
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
            <input ref={pwRef} type="password" className={styles.input} name="pw" value={userInfo.pw} onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            비밀번호 확인
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input ref={pwConfirmRef} type="password" className={styles.input} name="pwConfirm" value={userInfo.pwConfirm} onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            나이
          </div>
          <div className={styles.value}>
            <input ref={ageRef} type="number" className={styles.input} name="age" value={userInfo.age} onChange={handleChange}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            휴대폰 번호
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <select name="" id="" className={styles.select}>
              <option className={styles.option} value="SKT">SKT</option>
              <option className={styles.option} value="KT">KT</option>
              <option className={styles.option} value="LG">LG</option>
            </select>
            <input ref={phoneRef} type="text" className={styles.input} name="phone" value={userInfo.phone} onChange={handleChange}/>
            <button className={styles.button} onClick={onClickPhone}>
              인증번호 발송
            </button>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            성별
          </div>
          <div className={styles.value}>
            <button id="male" className={styles.gender_button} onClick={onClickGender}>남성</button>
            {/* <button className={styles.gender_button, styles.gender_button_active}>여성</button> */}
            <button id="female" className={styles.gender_button} onClick={onClickGender}>여성</button>
          </div>
        </div>
      </div>
      <section className={styles.notice_box}>
        <div className={styles.notice_title}>
          비밀번호 변경 시 유의사항
        </div>
        <ul className={styles.notice_list}>
          <li className={styles.notice}>
            영문자, 숫자, 특수만자 조합하여 8~12 자리여야 합니다.
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
        <button className={styles.red_button}>
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
  login: user => dispatch(login(user)),
  logout: () => dispatch(logout()),
  update: user => dispatch(update(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateForm)