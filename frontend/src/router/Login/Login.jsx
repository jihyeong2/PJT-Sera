import React from "react";
import styles from "./Login.module.css";
import Grid from "@material-ui/core/Grid";
import {withRouter} from 'react-router-dom';

const Login = (props) => {

  return (
    <Grid container spacing={12} className={styles.container}>
      <Grid container item xs={6} className={styles.leftBox}>
        <div className={styles.left_con}>
          <div className={styles.left_ttl}>
            <p className={styles.ttl_h}>Login</p>
            <p className={styles.ttl_p}>환영합니다. 로그인 해주세요!</p>
          </div>
          <div className={styles.login_form}>
            <ul class={styles.form_ul}>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>아이디</p>
                <input
                  type="text"
                  name="userLoginId"
                  placeholder="아이디를 입력하세요"
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>비밀번호</p>
                <input
                  type="password"
                  name="userPassword"
                  placeholder="비밀번호를 입력하세요"
                />
              </li>
              <li className={styles.form_input}>
                <div className={styles.input_left}>
                  <input type="checkbox" name="remeberId" />
                  <span className={styles.remeberId}>아이디 기억하기</span>
                </div>
                <div className={styles.input_right}>
                  <span className={styles.join_btn} onClick={() => { props.history.push("/signup1");}}>회원가입</span>
                  <span className={styles.line}>|</span>
                  <span className={styles.findpw_btn} onClick={() => { props.history.push("/findpw1");}}>비밀번호 찾기</span>
                </div>
              </li>
              <li className={styles.form_input}>
                <input className={styles.submit} type="submit" value="로그인" />
              </li>
            </ul>
          </div>
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
          <img className={styles.right_img} src={process.env.PUBLIC_URL + "/images/login_img.png"} alt="" />
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(Login);
