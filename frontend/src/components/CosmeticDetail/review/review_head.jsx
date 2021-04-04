import React from 'react';
import styles from './review.module.css';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { ImageAspectRatioTwoTone } from '@material-ui/icons';
import { useHistory } from "react-router-dom";

// const ReviewHead = ({onCreateReview}) => {
const ReviewHead = () => {
    // const [value, setValue] = React.useState(2);
    // const onSubmit = ()=>{
        
    //     onCreateReview(review);
    // }
    const history = useHistory();

    const showWriteModal = () => {
        
    }

    return (
        <div className={styles.review_head} >
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <p className={styles.review_num_title}>총 <span>23</span>건의 리뷰</p>
                    <p className={styles.review_rate}><span>4.7</span>점</p>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Rating name="read-only" value={4} readOnly />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    차트
                </Grid>
                <Grid item xs={4}>
                    <p className={styles.review_btn_title}>리뷰를 써보세요.</p>
                    <Button className={styles.review_btn} variant="contained" onClick={showWriteModal}>리뷰작성</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default ReviewHead;