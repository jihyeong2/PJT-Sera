import React from 'react';
import styles from './product_nav.module.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const ProductNav = (props) => {
    const classes = useStyles();
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return(
        <>
        <div className={styles.nav}>
            <Button className={styles.nav_btn} > ✔ 전체</Button>
            <Button className={styles.nav_btn} > ✔ 맞춤</Button>
            <Button className={styles.nav_btn} > ✔ 스킨케어</Button>
            <Button className={styles.nav_btn} > ✔ 메이크업</Button>
            <Button className={styles.nav_btn} > ✔ 향수</Button>
            <Button className={styles.nav_btn} > ✔ 남성</Button>
            <div className={styles.bar}></div>
        </div>
        <div className={styles.click_nav}>
        <ButtonGroup variant="text" aria-label="text primary button group">
            <Button>스킨케어(<span>8</span>)</Button>
            <Button>메이크업(<span>10</span>)</Button>
            <Button>향수(<span>3</span>)</Button>
        </ButtonGroup>
        </div>
        <div className={styles.filtering}>
            <div className={styles.right_check}>
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">정렬기준</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        onChange={handleChange}>
                            <MenuItem value={1}>가격 낮은 순</MenuItem>
                            <MenuItem value={2}>가격 높은 순</MenuItem>
                            <MenuItem value={3}>별점순</MenuItem>
                            <MenuItem value={4}>리뷰 개수 순</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
        </>
    )
}

export default ProductNav;