import { useRef, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import styles from './SearchBar.module.css';
import { useHistory } from 'react-router';
import {getSearchAll, getSearchCategory} from '../../../service/search';
import Swal from 'sweetalert2';

const SearchBar = (props) => {
  var lowerCase = /[a-z]/; //소문자
  var upperCase = /[A-Z]/; //대문자
  var koreanCase =  /^[ㄱ-ㅎ가-힣]+$/; //한글 정규식
  var specialCase =  /[~!@#$%^&*()_+|<>?:{}]/;//특수문자 정규식

  const history= useHistory();
  const inputRef= useRef();
  const selectRef= useRef();
  const handleSearch = (inputVal, inputCategory) => {
    if(!lowerCase.test(inputVal) || !upperCase.test(inputVal) || !koreanCase(inputVal) || !specialCase.test(inputVal)){
      Swal.fire({
        icon: 'error',
        text: '검색어를 입력해주세요.',
        showConfirmButton: false,
        timer: 1500
      });
      return
    }
    history.push()
  };
  const onKeyUpEnter = (e) => {
    if(e.key!=="Enter") return;
    handleSearch(inputRef.current.value,selectRef.current.value);
  }
  const onClickSearch = () => {
    handleSearch(inputRef.current.value,selectRef.current.value);
  }
  return (
    <div style={{marginTop: '2em'}}>
      <div className={styles.title}>
        검색어를 입력해주세요.
      </div>
      <div className={styles.container}>
        <select ref={selectRef} name="" id="" className={styles.select}>
          <option className={styles.option} value="none">카테고리</option>
          <option className={styles.option} value="스킨케어">스킨케어</option>
          <option className={styles.option} value="메이크업">메이크업</option>
          <option className={styles.option} value="향수">향수</option>
          <option className={styles.option} value="남성 화장품">남성</option>
        </select>
        <input
          ref={inputRef}
          type="text"
          name=""
          id=""
          className={styles.input}
          onKeyUp={onKeyUpEnter}
          />
        <IconButton
          aria-label="close"
          size="large"
          className={styles.icon}
          onClick={onClickSearch}
          >
          <SearchIcon fontSize="large"/>
        </IconButton>
      </div>
    </div>
  )
}

export default SearchBar;