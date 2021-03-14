import React from "react";
import styles from "./FindPW2.module.css";
import Grid from "@material-ui/core/Grid";
import {withRouter} from 'react-router-dom';

const FindPW2 = (props) => {
  
  const updatePw = (() => {
    props.history.push("/login");
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
                <p class={styles.input_ttl}>새 비밀번호</p>
                <input
                  className={styles.input_text_max}
                  type="password"
                  name="new_pw"
                  placeholder="새로운 비밀번호를 입력하세요"
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>새 비밀번호 확인</p>
                <input
                  className={styles.input_text_max}
                  type="password"
                  name="new_pw_check"
                  placeholder="새로운 비밀번호를 다시 입력해주세요"
                />
              </li>
              <li className={styles.form_input}>
                <input className={styles.submit} type="submit" value="확인" onClick={updatePw}/>
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

export default withRouter(FindPW2);
