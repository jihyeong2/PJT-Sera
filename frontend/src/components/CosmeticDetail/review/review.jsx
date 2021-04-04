import React from 'react';
import styles from './review.module.css';
import ReviewHead from './review_head';
import ReviewItem from './review_item';
import SearchBar from '../../common/SearchBar/SearchBar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


// const Review = ({onCreateReview}) => {
const Review = () => {
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
    // const onCreateReview = (val) =>{
    //     onCreateReview(val);
    // }
    // const [value, setValue] = React.useState(2);
    return(
        <div>
            <div className={styles.review_title}>REVIEW</div>
            {/* <ReviewHead onCreateReview={onCreateReview}/> */}
            <div className={styles.bar}></div>
            <div className={styles.search_bar}>
                <SearchBar />
            </div>
            
            <div className={styles.filtering}>
                <div className={styles.left_filter}>
                    <select name="" id="" className={styles.select} >
                        <option className={styles.option} value="none">나이</option>
                        <option className={styles.option} value="10">10대</option>
                        <option className={styles.option} value="20">20대</option>
                        <option className={styles.option} value="30-40">30/40대</option>
                        <option className={styles.option} value="50-60">50/60대</option>
                        <option className={styles.option} value="60이상">60이상</option>
                    </select>
                    <select name="" id="" className={styles.select} >
                        <option className={styles.option} value="none">성별   </option>
                        <option className={styles.option} value="남자">남자</option>
                        <option className={styles.option} value="여자">여자</option>
                    </select>
                    <select name="" id="" className={styles.select} >
                        <option className={styles.option} value="none">피부타입</option>
                        <option className={styles.option} value="DRPT">DRPT</option>
                        <option className={styles.option} value="DRNT">DRNT</option>
                        <option className={styles.option} value="DSPT">DSPT</option>
                        <option className={styles.option} value="DSNT">DSNT</option>
                        <option className={styles.option} value="DRPW">DRPW</option>
                        <option className={styles.option} value="DRNW">DRNW</option>
                        <option className={styles.option} value="DSPW">DSPW</option>
                        <option className={styles.option} value="DSNW">DSNW</option>
                        <option className={styles.option} value="ORPT">ORPT</option>
                        <option className={styles.option} value="ORNT">ORNT</option>
                        <option className={styles.option} value="OSPT">OSPT</option>
                        <option className={styles.option} value="OSNT">OSNT</option>
                        <option className={styles.option} value="ORPW">ORPW</option>
                        <option className={styles.option} value="ORNW">ORNW</option>
                        <option className={styles.option} value="OSPW">OSPW</option>
                        <option className={styles.option} value="OSNW">OSNW</option>
                    </select>
                </div>
                <div className={styles.right_check}>
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
            <div className={styles.review_list}>
                <div className={styles.item}>
                    <ReviewItem />
                </div>
                <div className={styles.item}>
                    <ReviewItem />
                </div>
                <div className={styles.item}>
                    <ReviewItem />
                </div>
                <div className={styles.item}>
                    <ReviewItem />
                </div>
                <div className={styles.item}>
                    <ReviewItem />
                </div>
                
            </div>
            <div className={styles.pagenation}>
                <Pagination className={styles.pagenation} count={10} shape="rounded" />
            </div>
            
        </div>
    );
}

export default Review;