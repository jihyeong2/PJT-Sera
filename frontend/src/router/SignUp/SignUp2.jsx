import React, {useState, useEffect} from "react";
import styles from "./SignUp2.module.css";
import Grid from "@material-ui/core/Grid";
import http from "../../http-common.js";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";

const SignUp2 = () => {
  const history = useHistory();
  const location = useLocation();


  const [userAge, setUserAge] = useState(""); //나이
  const [userPhone, setUserPhone] = useState(""); //휴대번호
  const [userGender, setUserGender] = useState("남"); //성별
  const [certificateNumber, setCertificateNumber] = useState(""); //인증번호

  //style
  const [snsButtonColor, setSnsButtonColor] = useState("#666");
  const [certificateNumColor, setCertificateNumColor] = useState("#666");
  const [submitBorderColor, setSubmitBorderColor] = useState("#666");
  const [submitTxtColor, setSubmitTxtColor] = useState("#666");

  const [ableAge, setAbleAge] = useState(false);
  const [ablePhone, setAblePhone] = useState(false);
  const [ableGender, setAbleGender] = useState(true);

  useEffect(() => {
    console.log(ableAge+", "+ablePhone+", "+ableGender);
    if(ableAge && ablePhone && ableGender){
      setSubmitBorderColor("#FD6C1D");
      setSubmitTxtColor("#FD6C1D");
    }else{
      setSubmitBorderColor("#666");
      setSubmitTxtColor("#666");
    }
  }, [ableAge, ablePhone, ableGender]);
  
  const onChangeUserAge = (e) => {
    setAbleAge(false);
    if(isNaN(e.target.value)){
      alert("숫자를 입력해주세요");
      onResetUserAge();
    }else{
      setUserAge(e.target.value);
      setAbleAge(true);
    }
  };

  const onChangeUserPhone = (e) => {
    setAblePhone(false);
    setUserPhone(e.target.value);
    if(e.target.value !== "" && e.target.value.length === 13 && e.target.value[3]==='-' && e.target.value[8]==='-'){
      setSnsButtonColor("#FD6C1D");
    }else setSnsButtonColor("#666");
  };

  const onChangecertificateNumber = (e) => {
    setAblePhone(false);
    setCertificateNumber(e.target.value);
   
    if(isNaN(e.target.value)){
      alert("숫자를 입력해주세요");
      onResetCertificateNumber();
    }else if(e.target.value==="") setCertificateNumColor("#666");
    else if(e.target.value.length === 6){
      setCertificateNumColor("#FD6C1D");
    }
  };

  const onResetUserAge = () => {
    setUserAge("");
  };
  
  const onResetCertificateNumber = () => {
    setCertificateNumber("");
  }


  const clickGender = (e) => {
    setAbleGender("true");
    setUserGender(e.target.value);
  };

  //인증번호 발송
  const sendSns = () => {
    if(snsButtonColor === "#FD6C1D"){
      http.post("v1/auth?phoneNumber="+userPhone)
      .then((res) => {
        if(res.data.status === "success") alert("인증번호가 발송되었습니다.");
        else alert("인증번호 발송이 실패했습니다.");
      })
      .catch((err) => {
          console.error(err);
      });
    }
  };
  

  //백에서 인증번호 비교
  const certificate = () => {
    if(certificateNumColor === "#FD6C1D"){
      http.get("v1/auth/"+certificateNumber)
      .then((res) => {
        console.log(res.data.data);
          if(res.data.data === "true"){
            setAblePhone(true);
            alert("본인인증이 완료했습니다.");
          }
          else alert("인증번호가 일치하지 않습니다.");
      })
      .catch((err) => {
          console.error(err);
      });
    }
  }

  //회원가입
  const onSubmit = (e) => {
    e.preventDefault();

    if(submitTxtColor === "#FD6C1D" && submitBorderColor === "#FD6C1D"){
      const user = {
        userLoginId: location.state.userLoginId,
        userNickname: location.state.userNickname,
        userPassword: location.state.userPassword,
        userAge: userAge,
        userPhone: userPhone,
        userGender: userGender,
      }

      http.post("v1/users/signIn", user)
      .then((res) => {
          if(res.data.status){
            alert("회원가입이 완료되었습니다.");
            history.push("/login");
          }else alert("회원가입이 실패했습니다");
      })
      .catch((err) => {
          console.error(err);
      });
    }else{
      if(!ableAge) alert("나이를 입력해주세요");
      else if(!ablePhone) alert("핸드폰 본인인증을 완료해주세요");
      else if(!ableGender) alert("성별을 체크해주세요");
      else alert("모든 입력폼을 작성해주세요");
    }
  }




  return (
    <Grid container spacing={12} className={styles.container}>
      <Grid container item xs={6} className={styles.leftBox}>
        <div className={styles.left_con}>
          <div className={styles.left_ttl}>
            <p className={styles.ttl_h}>Join</p>
            <p className={styles.ttl_p}>회원정보를 입력하세요</p>
          </div>
          <form className={styles.join_form}>
            <ul class={styles.form_ul}>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  나이<span>*</span>
                </p>
                <input
                  className={styles.input_text_max}
                  type="text"
                  name="userAge"
                  placeholder="나이를 입력하세요 예)26"
                  maxLength="2"
                  value={userAge}
                  onChange={onChangeUserAge}
                />
              </li>
              <li className={styles.form_input}>
                <p className={styles.input_ttl}>
                  휴대번호<span>*</span>
                </p>
                <select className={styles.input_select}>
                  <option value="SKT">SKT</option>
                  <option value="KT">KT</option>
                  <option value="LG">LGU+</option>
                </select>
                <input
                  className={styles.input_text_select}
                  type="text"
                  name="userPhone"
                  placeholder="ex)010-7123-1815"
                  value={userPhone}
                  onChange={onChangeUserPhone}
                  maxLength="13"
                />
                <input
                  className={styles.input_btn_select}
                  type="button"
                  value="인증번호 전송"
                  onClick={sendSns}
                  style = {{backgroundColor: snsButtonColor}}
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
                  maxLength="6"
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="본인 인증"
                  style = {{backgroundColor: certificateNumColor}}
                  onClick = {certificate}
                />
              </li>
              <li className={styles.form_input}>
                <p className={styles.input_ttl}>
                  성별<span>*</span>
                </p>
                <div className={styles.radio_items}>
                  <div className={styles.col_6}>
                    <input
                      id="man"
                      className={styles.only_sr}
                      type="radio"
                      name="gender"
                      value="남"
                      onClick={clickGender}
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
                      value="여"
                      onClick={clickGender}
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
                  style={{borderColor: submitBorderColor, color: submitTxtColor}}
                  onClick={onSubmit}
                />
              </li>
            </ul>
          </form>
          <div
            className={styles.prevBtn}
            onClick={() => { history.push("/signup1");}}>
            &lt; &nbsp;&nbsp; prev
          </div>
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

export default SignUp2;
