import { useRef, useState } from 'react';
// import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import styles from './SearchBar.module.css';
import { useHistory } from 'react-router';

const SearchBar = (props) => {
  const history= useHistory();
  const inputRef= useRef();
  const selectRef= useRef();
  const handleSearch = (inputVal, inputCategory) => {
    
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