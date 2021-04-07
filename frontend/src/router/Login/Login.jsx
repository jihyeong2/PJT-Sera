import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import http from "../../http-common.js";
import {login} from '../../actions/index';
import {connect} from 'react-redux';
import { useCookies } from 'react-cookie';
import Swal from "sweetalert2";

const { Kakao } = window;

const Login = ({login}) => {
  const history = useHistory();
  
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);

  const [userLoginId, setUserLoginId] = useState(""); //아이디
  const [userPassword, setUserPassword] = useState(""); //비밀번호

  //style
  const [submitBorderColor, setSubmitBorderColor] = useState("#666");
  const [submitTxtColor, setSubmitTxtColor] = useState("#666");

  var upperCase = /[A-Z]/; //대문자
  var regKorean =  /^[ㄱ-ㅎ가-힣]+$/; //한글 정규식
  var RegExp =  /[.~!@#$%^&*()_+|<>?:{}]/;//특수문자 정규식

  useEffect(() => {
    if(cookies.rememberId !== undefined){
      setUserLoginId(cookies.rememberId);
      setIsRemember(true);
    }
  }, []);

  
  //아이디 기억하기
  const onChangeRemember = (e) => {
    setIsRemember(e.target.checked);
    if(e.target.checked) setCookie('rememberId', userLoginId, {maxAge:2000});
    else removeCookie('rememberId');
  }

  //again
  useEffect(() => {
    if(userLoginId.length >= 5 && userLoginId.length <= 12 && userPassword.length>=6 && userPassword.length<=15){
      setSubmitBorderColor("#FD6C1D");
      setSubmitTxtColor("#FD6C1D");
    }else{
      setSubmitBorderColor("#666");
      setSubmitTxtColor("#666");
    }
  }, [userLoginId, userPassword]);

  const onChangeUserLoginId = (e) => {
    setUserLoginId(e.target.value);
    if(isRemember) setCookie('rememberId', e.target.value, {maxAge:2000});
  };

  const onChangeUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  //일반 로그인
  const onSubmit = (e) => {
    e.preventDefault();

    if((5 > userLoginId.length || userLoginId.length > 12) || (RegExp.test(userLoginId) ||upperCase.test(userLoginId) ||regKorean.test(userLoginId))){
      Swal.fire({
        icon: "error",
        text: "아이디 형식이 올바르지 않습니다",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if(userPassword.length<6 || userPassword.length>15){
      Swal.fire({
        icon: "error",
        text: "비밀번호 형식이 올바르지 않습니다",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    if(submitBorderColor==="#666") return;

    http
      .post("v1/login",
      {
        userLoginId, userPassword
      }
      )
      .then((res) => {
        if (res.data.status) {
          login(res.data.user);
          if(res.data.user.skinId === null) history.push("/skin"); //최초 로그인(피부타입x)
          else history.push("/");
        }else alert(res.data.message);
      })
      .catch((err) => {
        alert(err);
      });
  };


    //카카오 로그인 
    const kakaoLogin = () => {
      Kakao.Auth.login({
        //kakao auth-token 중 access_token얻기
        scope: "profile, account_email, gender, age_range",
        success: function (authObj) {
          //사용자 정보 얻기
          Kakao.API.request({
            url: "/v2/user/me",
            success: function (res) {
              console.log(res);
              // const kakao_email = res.kakao_account.email;
              // const kakao_age_range = res.kakao_account.age_range;
  
              const user = {
                userLoginId: Object.keys(res.kakao_account).includes('email') ? res.kakao_account.email.substring(0, res.kakao_account.email.indexOf("@")) : '',
                userNickname: Object.keys(res.kakao_account).includes('nickname') ? res.kakao_account.nickname : '',
                userPassword: "",
                userAge: Object.keys(res.kakao_account).includes('age_range') ? res.kakao_account.age_range.substring(
                  0,
                  res.kakao_account.age_range.indexOf("~")
                ) : '',
                userPhone: "",
                userGender: Object.keys(res.kakao_account).includes('gender') ? res.kakao_account.gender === "female" ? "여" : "남" : '남',
              };

              if(user.userLoginId === ''){
                Swal.fire({
                  icon: "error",
                  text: "카카오 로그인시 이메일을 필수 체크해주세요",
                  showConfirmButton: false,
                  timer: 2000,
                });
                return;
              }
  
              // 로그인
              http
                .post("v1/login/kakao", user)
                .then((res) => {
                  if (res.data.status) {
                    login(res.data.user);
                    if(res.data.user.skinId === null) history.push("/skin"); //최초 로그인(피부타입x)
                      else history.push("/");
                  } else alert("카카오 로그인에 실패했습니다.");
                })
                .catch((err) => {
                  console.log(err);
                });
            },
            fail: function (err) {
              alert(JSON.stringify(err));
            },
          });
        },
        fail: (error) => {
          console.log(JSON.stringify(error));
        },
      });
    };

  return (
    <Grid container spacing={12} className={styles.container}>
      <Grid container item xs={6} className={styles.leftBox}>
        <div className={styles.left_con}>
          <div className={styles.left_ttl}>
            <p className={styles.ttl_h}>Login</p>
            <p className={styles.ttl_p}>환영합니다. 로그인 해주세요!</p>
          </div>
          <form className={styles.login_form}>
            <ul class={styles.form_ul}>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>아이디</p>
                <input
                  type="text"
                  name="userLoginId"
                  placeholder="아이디를 입력하세요(5~12자)"
                  value={userLoginId}
                  onChange={onChangeUserLoginId}
                  maxlength="12"
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>비밀번호</p>
                <input
                  type="password"
                  name="userPassword"
                  placeholder="비밀번호를 입력하세요(6~15자)"
                  onChange={onChangeUserPassword}
                  maxlength="15"
                />
              </li>
              <li className={styles.form_input}>
                <div className={styles.input_left}>
                  <input type="checkbox" name="remeberId" checked={isRemember} onChange={onChangeRemember}/>
                  <span className={styles.remeberId}>아이디 기억하기</span>
                </div>
                <div className={styles.input_right}>
                  <span
                    className={styles.join_btn}
                    onClick={() => {
                      history.push("/signup1");
                    }}
                  >
                    회원가입
                  </span>
                  <span className={styles.line}>|</span>
                  <span
                    className={styles.findpw_btn}
                    onClick={() => {
                      history.push("/findpw1");
                    }}
                  >
                    비밀번호 찾기
                  </span>
                </div>
              </li>
              <li className={styles.form_input}>
                <input
                  className={styles.submit}
                  type="submit"
                  value="로그인"
                  onClick={onSubmit}
                  style={{borderColor: submitBorderColor, color: submitTxtColor}}
                />
              </li>
            </ul>
          </form>
          <div className={styles.or}>
            <div className={styles.left_line}></div>
            <span className={styles.or_txt}>또는</span>
            <div className={styles.right_line}></div>
          </div>
          <div className={styles.kakao}  onClick={kakaoLogin}>
            <img
               src={process.env.PUBLIC_URL + "/images/kakao_login.png"}
               alt=""
            />
          </div>
        </div>
      </Grid>
      <Grid container item xs={6} className={styles.rightBox}>
        <div className={styles.right_con}>
          <img
            className={styles.right_img}
            src={process.env.PUBLIC_URL + "/images/login_img.png"}
            alt=""
          />
        </div>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  user: state.user.user,
})

const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(login(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)