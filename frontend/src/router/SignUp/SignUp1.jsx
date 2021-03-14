import React from "react";
import styles from "./SignUp1.module.css";
import Grid from "@material-ui/core/Grid";
import {withRouter} from 'react-router-dom';

const SignUp1 = (props) => {
  
  return (
    <Grid container spacing={12} className={styles.container}>
      <Grid container item xs={6} className={styles.leftBox}>
        <div className={styles.left_con}>
          <div className={styles.left_ttl}>
            <p className={styles.ttl_h}>Join</p>
            <p className={styles.ttl_p}>회원정보를 입력하세요</p>
          </div>
          <div className={styles.join_form}>
            <ul class={styles.form_ul}>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  아이디<span>*</span>
                </p>
                <input
                  className={styles.input_text}
                  type="text"
                  name="userLoginId"
                  placeholder="아이디를 입력하세요"
                />
                <input className={styles.input_btn} type="button" value="중복 확인" />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>비밀번호<span>*</span></p>
                <input className={styles.input_text_max}
                  type="password"
                  name="userPassword"
                  placeholder="비밀번호를 입력하세요"
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>비밀번호 확인<span>*</span></p>
                <input className={styles.input_text_max}
                  type="password"
                  name="userPassword2"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  닉네임<span>*</span>
                </p>
                <input
                  className={styles.input_text}
                  type="text"
                  name="userName"
                  placeholder="닉네임을 입력하세요"
                />
                <input className={styles.input_btn} type="button" value="중복 확인" />
              </li>
            </ul>
          </div>
          <div className={styles.nextBtn} onClick={() => { props.history.push("/signup2");}}>next &nbsp;&nbsp; > </div>
        </div>
      </Grid>
      <Grid container item xs={6} className={styles.rightBox}>
        <div className={styles.right_con}>
          <img
            className={styles.right_img}
            src={process.env.PUBLIC_URL + "/images/join_img.jpg"}
            alt=""
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(SignUp1);

