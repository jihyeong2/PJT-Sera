import React, {useState} from "react";
import styles from "./FindPW2.module.css";
import Grid from "@material-ui/core/Grid";
import http from "../../http-common.js";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

const FindPW2 = () => {
  const history = useHistory();
  const location = useLocation();

  const userLoginId = location.state.userLoginId;//아이디

  const [userPassword, setUserPassword] = useState(""); //비밀번호
  const [userPassword2, setUserPassword2] = useState(""); //비밀번호 확인

  const [ablePassword, setAblePassword] = useState(false);

  const onChangeUserPassword = (e) => {
    setAblePassword(false);
    setUserPassword(e.target.value);
    if(userPassword2 === e.target.value && (userPassword2 !== '' && e.target.value!=='')) setAblePassword(true);
  };

  const onChangeUserPassword2 = (e) => {
    setAblePassword(false);
    setUserPassword2(e.target.value);
    if(userPassword === e.target.value && (userPassword !== '' && e.target.value !== '')) setAblePassword(true);
  }


  //비밀번호 변경
  const updatePw = () => {
    if(ablePassword){
      http.put("v1/users/password",{
        userLoginId, userPassword
      })
      .then((res) => {
          if(res.data.status === "success"){
            alert("비밀번호를 변경했습니다. 로그인해주세요");
            history.push("/login");
          }else alert("비밀번호 변경을 실패했습니다");
      })
      .catch((err) => {
          console.error(err);
      });
    }
  }

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
                  name="userPassword"
                  placeholder="새로운 비밀번호를 입력하세요"
                  value={userPassword}
                  onChange={onChangeUserPassword}
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>새 비밀번호 확인</p>
                <input
                  className={styles.input_text_max}
                  type="password"
                  name="userPassword2"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={userPassword2}
                  onChange={onChangeUserPassword2}
                />
              </li>
              <li className={styles.form_input}>
                <input className={styles.submit} type="button" value="확인" onClick={updatePw}/>
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

export default FindPW2;
