import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import http from "../../http-common.js";

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
    if(((5<=userLoginId) && (userLoginId <= 12)) && !(RegExp.test(userLoginId) || upperCase.test(userLoginId) || regKorean.test(userLoginId))){
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

    http
      .get("v1/users/" + userLoginId)
      .then((res) => {
        if (res.data.status === "success") {

          const user = {
            userLoginId: userLoginId,
            userNickname: res.data.data.userNickname,
            userPassword: userPassword,
            userAge: res.data.data.userAge,
            userPhone: res.data.data.userPhone,
            userGender: res.data.data.userGender,
          };

          console.log("회원정보: " + JSON.stringify(user));

          //redux
          console.log(res.data.status);
          history.push("/");
          
        } else alert("가입된 회원이 아닙니다.");
      })
      .catch((err) => {
        alert("가입된 회원이 아닙니다.");
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
          <div className={styles.left_sns}>
            <div className={styles.kakao}>
              <img
                src={process.env.PUBLIC_URL + "/images/kakao_logo.png"}
                alt=""
              />
            </div>
            <div className={styles.google}>
              <img
                src={process.env.PUBLIC_URL + "/images/google_logo.png"}
                alt=""
              />
            </div>
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
