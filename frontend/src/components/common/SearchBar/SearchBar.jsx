import React from 'react';
// import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
  return (
    <div style={{marginTop: '2em'}}>
      <div className={styles.title}>
        검색어를 입력해주세요.
      </div>
      <div className={styles.container}>
        <select name="" id="" className={styles.select}>
          <option className={styles.option} value="none">정렬기준</option>
          <option className={styles.option} value="화장품">화장품</option>
          <option className={styles.option} value="성분">성분</option>
          <option className={styles.option} value="작성자">작성자</option>
          <option className={styles.option} value="내용">내용</option>
        </select>
        <input
          type="text"
          name=""
          id=""
          className={styles.input}
          />
        <IconButton
          aria-label="close"
          size="large"
          className={styles.icon}
          >
          <SearchIcon fontSize="large"/>
        </IconButton>
      </div>
    </div>
  )
}

export default SearchBar;