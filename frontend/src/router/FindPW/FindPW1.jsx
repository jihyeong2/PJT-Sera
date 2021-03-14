import React from "react";
import styles from "./FindPW1.module.css";
import Grid from "@material-ui/core/Grid";
import {withRouter} from 'react-router-dom';

const FindPW1 = (props) => {
  
  const goFindPW = (() => {
    props.history.push("/findpw2");
  });

  return (
    <Grid container spacing={12} className={styles.container}>
      <Grid container item xs={6} className={styles.leftBox}>
        <div className={styles.left_con}>
          <div className={styles.left_ttl}>
            <p className={styles.ttl_h}>Forget your pw?</p>
            <p className={styles.ttl_p}>비밀번호를 잊으셨나요?</p>
          </div>
          <div className={styles.findpw_form}>
            <ul class={styles.form_ul}>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>아이디</p>
                <input
                  className={styles.input_text}
                  type="text"
                  name="userLoginId"
                  placeholder="가입한 아이디를 입력하세요"
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="중복 확인"
                />
              </li>
              <li className={styles.form_input}>
                <p className={styles.input_ttl}>휴대번호</p>
                <select>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG">LGU+</option>
                </select>
                <input
                  className={styles.input_text_select}
                  type="text"
                  name="userLoginId"
                  placeholder="ex)010-7123-1815"
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="중복 확인"
                />
              </li>
              <li className={styles.form_input}>
                <input
                  className={styles.input_text}
                  type="text"
                  name="userLoginId"
                  placeholder="발송된 인증번호를 입력해주세요 예)1234"
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="본인 인증"
                />
              </li>
              <li className={styles.form_input}>
                <input className={styles.submit} type="submit" value="확인" onClick={goFindPW}/>
              </li>
            </ul>
          </div>
        </div>
      </Grid>
      <Grid container item xs={6} className={styles.rightBox}>
        <div className={styles.right_con}>
          <img
            className={styles.right_img}
            src={process.env.PUBLIC_URL + "/images/findpw_img.jpg"}
            alt=""
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(FindPW1);
