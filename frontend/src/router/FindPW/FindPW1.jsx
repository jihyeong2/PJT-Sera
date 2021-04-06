import React, { useState, useEffect } from "react";
import styles from "./FindPW1.module.css";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import http from "../../http-common.js";

const FindPW1 = () => {
  const history = useHistory();

  const [userLoginId, setUserLoginId] = useState(""); //아이디
  const [userPhone, setUserPhone] = useState(""); //휴대번호
  const [certificateNumber, setCertificateNumber] = useState(""); //인증번호

  //style
  const [snsButtonColor, setSnsButtonColor] = useState("#666");
  const [certificateNumColor, setCertificateNumColor] = useState("#666");
  const [submitBorderColor, setSubmitBorderColor] = useState("#666");
  const [submitTxtColor, setSubmitTxtColor] = useState("#666");

  const [ableLoginId, setAbleLoginId] = useState(false);
  const [ablePhone, setAblePhone] = useState(false);

  useEffect(() => {
    console.log(ableLoginId + ", " + ablePhone);
    if (ableLoginId && ablePhone) {
      setSubmitBorderColor("#FD6C1D");
      setSubmitTxtColor("#FD6C1D");
    } else {
      setSubmitBorderColor("#666");
      setSubmitTxtColor("#666");
    }
  }, [ableLoginId, ablePhone]);

  var upperCase = /[A-Z]/; //대문자
  var regKorean = /^[ㄱ-ㅎ가-힣]+$/; //한글 정규식
  var RegExp = /[~!@#$%^&*()_+|<>?:{}]/; //특수문자 정규식

  const onChangeUserLoginId = (e) => {
    setUserLoginId(e.target.value);
    if (((5<=e.target.value.length) && (e.target.value.length <= 12)) && !(RegExp.test(e.target.value) || upperCase.test(e.target.value)
    || regKorean.test(e.target.value))) setAbleLoginId(true);
  };


  const onChangeUserPhone = (e) => {
    setAblePhone(false);
    setUserPhone(e.target.value);
    if (
      e.target.value !== "" &&
      e.target.value.length === 13 &&
      e.target.value[3] === "-" &&
      e.target.value[8] === "-"
    ) {
      setSnsButtonColor("#FD6C1D");
    } else setSnsButtonColor("#666");
  };

  const onChangecertificateNumber = (e) => {
    setAblePhone(false);
    setCertificateNumber(e.target.value);

    if (isNaN(e.target.value)) {
      alert("숫자를 입력해주세요");
      onResetCertificateNumber();
    } else if (e.target.value === "") setCertificateNumColor("#666");
    else if (e.target.value.length === 6) {
      setCertificateNumColor("#FD6C1D");
    }
  };

  const onResetCertificateNumber = () => {
    setCertificateNumber("");
  };

  //인증번호 발송
  const sendSns = () => {

    if (ablePhone) {
      alert("이미 본인인증이 되었습니다.");
      return;
    }

    if (snsButtonColor === "#FD6C1D") {
      //인증번호 발송 전 아이디와 전화번호가 일치하는 유저인지 확인
      http.get(`v1/users/${userLoginId}/${userPhone}`)
      .then((res) => {
        if(res.data.data === null){
          alert("존재하지 않는 회원입니다.");
          return;
        }else{
          http
          .post("v1/auth?phoneNumber=" + userPhone)
          .then((res) => {
            if (res.data.status === "success")
              alert("인증번호가 발송되었습니다.");
            else alert("인증번호 발송이 실패했습니다.");
          })
          .catch((err) => {
            console.error(err);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else alert("휴대번호 형식이 올바르지 않습니다");
  };

  //백에서 인증번호 비교
  const certificate = () => {
    if (ablePhone) {
      alert("이미 본인인증이 되었습니다.");
      return;
    }

    if (certificateNumColor === "#FD6C1D") {
      http
        .get("v1/auth/" + certificateNumber)
        .then((res) => {
          console.log(res.data.data);
          if (res.data.data === "true") {
            setAblePhone(true);
            alert("본인인증이 완료했습니다.");
          } else alert("인증번호가 일치하지 않습니다.");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const goFindPW2 = () => {
    if (submitBorderColor === "#FD6C1D" && submitTxtColor === "#FD6C1D") {
      history.push({
        pathname: "/findpw2",
        state: {
          userLoginId: userLoginId,
        },
      });
    } else {
      if (!ableLoginId) alert("아이디 형식이 올바르지 않습니다");
      else if (!ablePhone) alert("본인 인증을 완료해주세요");
      else alert("모든 입력폼을 작성해주세요");
    }
  };

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
                  placeholder="가입한 아이디를 입력하세요(5~12자)"
                  value={userLoginId}
                  onChange={onChangeUserLoginId}
                  maxlength="12"
                />
              </li>
              <li className={styles.form_input}>
                <p className={styles.input_ttl}>휴대번호</p>
                <select className={styles.input_select}>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG">LGU+</option>
                </select>
                <input
                  className={styles.input_text_select}
                  type="text"
                  name="userPhone"
                  placeholder="예)010-7123-1815"
                  onChange={onChangeUserPhone}
                  value={userPhone}
                  maxlength="13"
                />
                <input
                  className={styles.input_btn_select}
                  type="button"
                  value="인증번호 전송"
                  onClick={sendSns}
                  style={{ backgroundColor: snsButtonColor }}
                />
              </li>
              <li className={styles.form_input}>
                <input
                  className={styles.input_text}
                  type="text"
                  name="certificateNumber"
                  placeholder="발송된 인증번호를 입력해주세요 예)1234"
                  value={certificateNumber}
                  onChange={onChangecertificateNumber}
                  maxlength="6"
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="본인 인증"
                  style={{ backgroundColor: certificateNumColor }}
                  onClick={certificate}
                />
              </li>
              <li className={styles.form_input}>
                <input
                  className={styles.submit}
                  type="submit"
                  value="확인"
                  style={{
                    borderColor: submitBorderColor,
                    color: submitTxtColor,
                  }}
                  onClick={goFindPW2}
                />
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

export default FindPW1;
