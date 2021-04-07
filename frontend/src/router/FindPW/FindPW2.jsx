import React, { useState, useEffect } from "react";
import styles from "./FindPW2.module.css";
import Grid from "@material-ui/core/Grid";
import http from "../../http-common.js";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Swal from "sweetalert2";

const FindPW2 = () => {
  const history = useHistory();
  const location = useLocation();

  const userLoginId = location.state.userLoginId; //아이디

  const [userPassword, setUserPassword] = useState(""); //비밀번호
  const [userPassword2, setUserPassword2] = useState(""); //비밀번호 확인

  const [ablePassword, setAblePassword] = useState(false);

  //style
  const [submitBorderColor, setSubmitBorderColor] = useState("#666");
  const [submitTxtColor, setSubmitTxtColor] = useState("#666");

  const onChangeUserPassword = (e) => {
    setAblePassword(false);
    setUserPassword(e.target.value);
    if (
      userPassword2 === e.target.value &&
      userPassword2 !== "" &&
      e.target.value !== "" && e.target.value.length>=6 && e.target.value.length<=15
    )
      setAblePassword(true);
  };

  const onChangeUserPassword2 = (e) => {
    setAblePassword(false);
    setUserPassword2(e.target.value);
    if (
      userPassword === e.target.value &&
      userPassword !== "" &&
      e.target.value !== "" && e.target.value.length>=6 && e.target.value.length<=15
    )
      setAblePassword(true);
  };

  useEffect(() => {
    console.log(ablePassword);
    if(ablePassword){
      setSubmitBorderColor("#FD6C1D");
      setSubmitTxtColor("#FD6C1D");
    }else{
      setSubmitBorderColor("#666");
      setSubmitTxtColor("#666");
    }
  }, [ablePassword]);

  //비밀번호 변경
  const updatePw = () => {
    if(!ablePassword){
      Swal.fire({
        icon: "error",
        text: "비밀번호가 올바르지 않습니다",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

      http
        .put("v1/users/password", {
          userLoginId,
          userPassword,
        })
        .then((res) => {
          if (res.data.status === "success") {
            Swal.fire({
              icon: "success",
              text: "비밀번호를 변경했습니다. 로그인 해주세요",
              showConfirmButton: false,
              timer: 2000,
            });
            history.push("/login");
          } else{
            Swal.fire({
              icon: "error",
              text: "비밀번호 변경을 실패했습니다",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
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
                <input
                  className={styles.submit}
                  type="button"
                  value="확인"
                  onClick={updatePw}
                  style={{borderColor: submitBorderColor, color: submitTxtColor}}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.right_con}>
          <img
            className={styles.right_img}
            src={process.env.PUBLIC_URL + "/images/findpw_img.jpg"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default FindPW2;
