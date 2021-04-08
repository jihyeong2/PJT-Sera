import React, { useEffect, useState } from "react";
import styles from "./SignUp1.module.css";
import { useHistory } from "react-router-dom";
import http from "../../http-common.js";
import Swal from "sweetalert2";

const SignUp1 = () => {
  const history = useHistory();

  const [userLoginId, setUserLoginId] = useState(""); //아이디
  const [userNickname, setUserNickname] = useState(""); //닉네임
  const [userPassword, setUserPassword] = useState(""); //비밀번호
  const [userPassword2, setUserPassword2] = useState(""); //비밀번호 확인

  //style
  const [idButtonColor, setIdButtonColor] = useState("#666");
  const [NameButtonColor, setNameButtonColor] = useState("#666");
  const [nextColor, setNextColor] = useState("#999");

  const [ableLoginId, setAbleLoginId] = useState(false);
  const [ableNickname, setAbleNickname] = useState(false);
  const [ablePassword, setAblePassword] = useState(false);

  const onChangeUserLoginId = (e) => {
    setAbleLoginId(false);
    setUserLoginId(e.target.value);
    if (
      5 <= e.target.value.length &&
      e.target.value.length <= 12 &&
      !(
        RegExp.test(e.target.value) ||
        upperCase.test(e.target.value) ||
        regKorean.test(e.target.value)
      )
    )
      setIdButtonColor("#FD6C1D");
    else setIdButtonColor("#666");
  };

  const onChangeUserNickname = (e) => {
    setAbleNickname(false);
    setUserNickname(e.target.value);
    if ((4 <= e.target.value.length && e.target.value.length <= 6) && !RegExp.test(e.target.value)) setNameButtonColor("#FD6C1D");
    else setNameButtonColor("#666");
  };

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
    if (ableLoginId && ableNickname && ablePassword) setNextColor("#FD6C1D");
    else setNextColor("#999");
  }, [ableLoginId, ableNickname, ablePassword]);

  var upperCase = /[A-Z]/; //대문자
  var regKorean = /^[ㄱ-ㅎ가-힣]+$/; //한글 정규식
  var RegExp = /[.~!@#$%^&*()_+|<>?:{}]/; //특수문자 정규식

  //아이디 중복확인
  const checkUserLoginId = () => {
    if (idButtonColor === "#FD6C1D") {
      http
        .get("v1/users/duplicate/" + userLoginId)
        .then((res) => {
          if (res.data.data) {
            Swal.fire({
              icon: "error",
              text: "이미 중복된 아이디입니다.",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: "사용 가능한 아이디입니다.",
              showConfirmButton: false,
              timer: 2000,
            });
            setAbleLoginId(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "아이디 형식이 올바르지 않습니다.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  //닉네임 중복확인
  const checkUserNickname = () => {
    //닉네임 양식 체크
    if (NameButtonColor === "#FD6C1D") {  
      http
        .get("v1/users/duplicate/nickname/" + userNickname)
        .then((res) => {
          if (res.data.data) {
            Swal.fire({
              icon: "error",
              text: "이미 중복된 닉네임입니다.",
              showConfirmButton: false,
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "success",
              text: "사용 가능한 닉네임입니다.",
              showConfirmButton: false,
              timer: 2000,
            });
            setAbleNickname(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else{
      Swal.fire({ 
        icon: "error",
        text: "닉네임 형식이 올바르지 않습니다.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  //다음 페이지 이동
  const onNext = (e) => {
    if (nextColor === "#FD6C1D") {
      history.push({
        pathname: "/signup2",
        state: {
          userLoginId,
          userNickname,
          userPassword,
        },
      });
    } else {
      if (!ableLoginId) {
        Swal.fire({
          icon: "error",
          text: "아이디 중복확인을 해주세요",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (!ableNickname) {
        Swal.fire({
          icon: "error",
          text: "닉네임 중복확인을 해주세요",
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (!ablePassword) {
        Swal.fire({
          icon: "error",
          text: "비밀번호가 올바르지 않습니다",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "모든 입력폼을 작성해주세요",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftBox}>
        <div className={styles.left_con}>
          <div className={styles.left_ttl}>
            <p className={styles.ttl_h}>Join</p>
            <p className={styles.ttl_p}>회원정보를 입력하세요</p>
          </div>
          <form className={styles.join_form}>
            <ul class={styles.form_ul}>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  아이디<span>*</span>
                </p>
                <input
                  className={styles.input_text}
                  type="text"
                  name="userLoginId"
                  placeholder="5~12자의 소문자,숫자만 사용가능합니다"
                  onChange={onChangeUserLoginId}
                  value={userLoginId}
                  maxlength="12"
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="중복 확인"
                  onClick={checkUserLoginId}
                  style={{ backgroundColor: idButtonColor }}
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  닉네임<span>*</span>
                </p>
                <input
                  className={styles.input_text}
                  type="text"
                  name="userNickname"
                  placeholder="4~6자 이하의 한글,숫자 조합만 가능합니다"
                  onChange={onChangeUserNickname}
                  value={userNickname}
                />
                <input
                  className={styles.input_btn}
                  type="button"
                  value="중복 확인"
                  onClick={checkUserNickname}
                  style={{ backgroundColor: NameButtonColor }}
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  비밀번호<span>*</span>
                </p>
                <input
                  className={styles.input_text_max}
                  type="password"
                  name="userPassword"
                  placeholder="6~15자의 영문,숫자,특수문자 조합만 가능합니다."
                  onChange={onChangeUserPassword}
                  value={userPassword}
                  maxlength="15"
                />
              </li>
              <li className={styles.form_input}>
                <p class={styles.input_ttl}>
                  비밀번호 확인<span>*</span>
                </p>
                <input
                  className={styles.input_text_max}
                  type="password"
                  name="userPassword2"
                  placeholder="비밀번호를 다시 입력하세요"
                  onChange={onChangeUserPassword2}
                  value={userPassword2}
                  maxlength="15"
                />
              </li>
            </ul>
          </form>
          <div
            className={styles.nextBtn}
            onClick={onNext}
            style={{ color: nextColor }}
          >
            next &nbsp;&nbsp; >
          </div>
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.right_con}>
          <img
            className={styles.right_img}
            src={process.env.PUBLIC_URL + "/images/join_img.jpg"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp1;
