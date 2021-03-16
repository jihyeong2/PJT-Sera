import React, { useRef } from "react";
import styles from "./SignUp2.module.css";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import axios from 'axios';

const SignUp2 = (props) => {
  console.log("야"+props.location.state.user.userLoginId); //넘어옴
  const submit = () => {
   

  }

  //핸드폰 인증번호 테스트
  const phoneRef = useRef();
  const sendSns = () => {
    const phoneNumber = phoneRef.current.value;
    console.log(phoneNumber);

    axios.get( 'http://localhost:9999/api/v1/auth?phoneNumber='+phoneNumber) 
    .then((response) => { 
      console.log("인증번호 가져오자 "+response.data);
      const obj = response.data;
      
      for(var key in obj){
        console.log("key: "+key+", value: "+JSON.stringify(obj[key]));
      }

     }) 
    .catch((response) => { console.log("Error") });

  }  


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
                  나이<span>*</span>
                </p>
                <input
                  className={styles.input_text_max}
                  type="number"
                  name="userAge"
                  placeholder="나이를 입력하세요 예)26"
                />
              </li>
              <li className={styles.form_input}>
                <p className={styles.input_ttl}>
                  휴대번호<span>*</span>
                </p>
                <select>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG">LGU+</option>
                </select>
                <input
                  className={styles.input_text_select}
                  ref = {phoneRef}
                  type="text"
                  name="userPhone"
                  placeholder="ex)010-7123-1815"
                />
                <input
                  className={styles.input_btn_select}
                  type="button"
                  value="인증번호 전송"
                  onClick={sendSns}
                />
              </li>
              <li className={styles.form_input}>
                <input
                  className={styles.input_text}
                  type="number"
                  name="authnumber"
                  placeholder="발송된 인증번호를 입력해주세요 예)1234"
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="본인 인증"
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  성별<span>*</span>
                </p>
                <div className={styles.radio_items}>
                  <div className={styles.col_6}>
                    <input
                      id="man"
                      className={styles.only_sr}
                      type="radio"
                      name="gender"
                      value="1"
                      defaultChecked
                    />
                    <label for="man">남성</label>
                  </div>
                  <div className={styles.col_6}>
                    <input
                      id="woman"
                      className={styles.only_sr}
                      type="radio"
                      name="gender"
                      value="2"
                    />
                    <label for="woman">여성</label>
                  </div>
                </div>
              </li>
              <li className={styles.form_input}>
                <input
                  className={styles.submit}
                  type="submit"
                  value="확인"
                  onClick={submit}
                />
              </li>
            </ul>
          </div>
          <div className={styles.prevBtn} onClick={() => { props.history.push("/signup1");}}>&lt; &nbsp;&nbsp; prev</div>
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

export default withRouter(SignUp2);
