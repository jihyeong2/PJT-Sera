import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './UpdateForm.module.css';

const UpdateForm = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.guide}>
        <span className={styles.highlight}> *</span>
        <span className={styles.text}>표시 항목은 반드시 입력해주세요.</span>
      </div>
      <section className={styles.table}>
        <div className={styles.table_row}>
          <div className={styles.label}>
            아이디
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            unni2
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            닉네임
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input type="text" className={styles.input}/>
            <button className={styles.button}>
              중복확인
            </button>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            비밀번호
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input type="password" className={styles.input}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            비밀번호 확인
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <input type="password" className={styles.input}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            나이
          </div>
          <div className={styles.value}>
            <input type="number" className={styles.input}/>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            휴대폰 번호
            <span className={styles.highlight}> *</span>
          </div>
          <div className={styles.value}>
            <select name="" id="" className={styles.select}>
              <option className={styles.option} value="SKT">SKT</option>
              <option className={styles.option} value="KT">KT</option>
              <option className={styles.option} value="LG">LG</option>
            </select>
            <input type="text" className={styles.input}/>
            <button className={styles.button}>
              인증번호 발송
            </button>
          </div>
        </div>
        <div className={styles.table_row}>
          <div className={styles.label}>
            성별
          </div>
          <div className={styles.value}>
            <button className={styles.gender_button}>남성</button>
            {/* <button className={styles.gender_button, styles.gender_button_active}>여성</button> */}
            <button className={`${styles.gender_button} ${styles.gender_button_active}`}>여성</button>
          </div>
        </div>
      </section>
      <section className={styles.notice_box}>
        <div className={styles.notice_title}>
          비밀번호 변경 시 유의사항
        </div>
        <ul className={styles.notice_list}>
          <li className={styles.notice}>
            영문자, 숫자, 특수만자 조합하여 8~12 자리여야 합니다.
          </li>
          <li className={styles.notice}>
            아이디와 4자리 이상 동일하거나, 4자리 이상 반복되는 문자와 숫자는 사용이 불가합니다.
          </li>
          <li className={styles.notice}>
          사용 가능 특수문자 : !"#$%^&*+-/:;?@~
          </li>
        </ul>
      </section>
      <section className={styles.button_box}>
        <button className={styles.white_button}>원래대로</button>
        <button className={styles.black_button}>수정하기</button>
        <button className={styles.red_button}>
          탈퇴하기&nbsp;
          <FontAwesomeIcon icon="chevron-right" size="lg" color="#EB0000"/>  
        </button>
      </section>
    </div>
  );
};

export default UpdateForm;