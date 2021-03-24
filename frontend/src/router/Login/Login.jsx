import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import http from "../../http-common.js";

const { Kakao } = window;

const Login = () => {
  const history = useHistory();

  const [userLoginId, setUserLoginId] = useState(""); //아이디
  const [userPassword, setUserPassword] = useState(""); //비밀번호

  //style
  const [submitBorderColor, setSubmitBorderColor] = useState("#666");
  const [submitTxtColor, setSubmitTxtColor] = useState("#666");

  var upperCase = /[A-Z]/; //대문자
  var regKorean =  /^[ㄱ-ㅎ가-힣]+$/; //한글 정규식
  var RegExp =  /[~!@#$%^&*()_+|<>?:{}]/;//특수문자 정규식

  //again
  useEffect(() => {
    if(userLoginId.length >= 5){
      setSubmitBorderColor("#FD6C1D");
      setSubmitTxtColor("#FD6C1D");
    }else{
      setSubmitBorderColor("#666");
      setSubmitTxtColor("#666");
    }
  }, [userLoginId]);


  const onChangeUserLoginId = (e) => {
    setUserLoginId(e.target.value);
  };

  const onChangeUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  //로그인
  const onSubmit = (e) => {
    e.preventDefault();

    if(submitBorderColor !== "#FD6C1D"){
      alert("아이디 형식이 올바르지 않습니다(5글자 이상)");
      return;
    }

    http
      .post("v1/login",
      {
        userLoginId, userPassword
      }
      )
      .then((res) => {
        if (res.data.status) {
          const user = {
            auth_token: res.data.auth_token,
            userLoginId: res.data.user.userLoginId,
            userNickname: res.data.user.userNickname,
            userPassword: res.data.user.userPassword,
            userAge: res.data.user.userAge,
            userPhone: res.data.user.userPhone,
            userGender: res.data.user.userGender,
          };

          console.log("회원정보: " + JSON.stringify(user));

         
          console.log(res.data.status);
          history.push("/");
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
              const kakao_email = res.kakao_account.email;
              const kakao_age_range = res.kakao_account.age_range;
  
              const user = {
                userLoginId: kakao_email.substring(0, kakao_email.indexOf("@")),
                userNickname: res.kakao_account.profile.nickname,
                userPassword: "",
                userAge: kakao_age_range.substring(
                  0,
                  kakao_age_range.indexOf("~")
                ),
                userPhone: "",
                userGender: res.kakao_account.gender === "female" ? "여" : "남",
              };
  
              // 로그인
              http
                .post("v1/login/kakao", user)
                .then((res) => {
                  if (res.data.status) {
                    const user = {
                      auth_token: res.data.auth_token,
                      userLoginId: res.data.user.userLoginId,
                      userNickname: res.data.user.userNickname,
                      userPassword: res.data.user.userPassword,
                      userAge: res.data.user.userAge,
                      userPhone: res.data.user.userPhone,
                      userGender: res.data.user.userGender,
                    };

                    console.log("회원정보 " + JSON.stringify(user));

                    //첫 로그인이면 피부타입 검사하러 가기
                  } else alert("카카오 로그인에 실패했습니다.");
                })
                .catch((err) => {
                  console.log(err);
                });
            },
            fail: function (error) {
              alert(JSON.stringify(error));
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
                  placeholder="아이디를 입력하세요"
                  value={userLoginId}
                  onChange={onChangeUserLoginId}
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>비밀번호</p>
                <input
                  type="password"
                  name="userPassword"
                  placeholder="비밀번호를 입력하세요"
                  onChange={onChangeUserPassword}
                />
              </li>
              <li className={styles.form_input}>
                <div className={styles.input_left}>
                  <input type="checkbox" name="remeberId" />
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

export default Login;
