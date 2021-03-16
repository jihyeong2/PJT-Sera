import React from 'react';
import styles from './review.module.css';
import ReviewHead from './review_head';
import SearchBar from '../common/SearchBar/SearchBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


const Review = (props) => {
    const classes = useStyles();
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
      })
    const handleChange_radio = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };
    return(
        <div>
            <div className={styles.review_title}>REVIEW</div>
            <ReviewHead />
            <div className={styles.search_bar}>
                <SearchBar />
            </div>
            <div className={styles.filtering}>
                <FormControlLabel className={styles.radio}
                    control={
                    <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange_radio}
                        name="checkedA"
                        color="primary"
                    />
                    }
                    label="일반리뷰"
                />
                <FormControlLabel className={styles.radio}
                    control={
                    <Checkbox
                        checked={state.checkedB}
                        onChange={handleChange_radio}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="포토리뷰"
                />

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">정렬기준</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    
                    onChange={handleChange}
                    >
                        <MenuItem value={1}>최신순</MenuItem>
                        <MenuItem value={2}>별점순</MenuItem>
                        <MenuItem value={3}>도움이된순</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={styles.picture_list}>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample.PNG'} alt="리뷰사진"/>
                <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
            </div>
            
        </div>
    );
}

export default Review;