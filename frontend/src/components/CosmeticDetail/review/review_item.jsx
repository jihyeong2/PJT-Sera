import React from 'react';
import styles from './review_item.module.css';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const ReviewItem = (props) => {
    // const [value, setValue] = React.useState(2);
    return(
        <div className={styles.review_item} >
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <div className={styles.review_pro}>
                        <div className={styles.title_pro}>
                            <span className={styles.nickname}>지니</span>
                            <span className={styles.prof}>
                                <span> 여</span>/ 
                                <span>25</span>
                            </span>
                            
                        </div>
                        <div className={styles.circle}>
                            <div className={styles.skin_type}>
                                OSPW
                            </div>
                        </div>
                        
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className={styles.review_content}>
                        <div>
                            <Box className={styles.star_rate} component="fieldset" mb={3} borderColor="transparent">
                                <Rating name="read-only" value={4} readOnly />
                            </Box>
                            <span className={styles.date}>2021.03.11</span>
                            <CreateIcon fontSize="small" className={styles.change_icon}/>
                            <DeleteIcon fontSize="small" className={styles.trash_icon}/>
                        </div>
                        <div className={styles.good_review}>
                            <div className={styles.good}>
                                <MoodIcon className={styles.good_icon}/>좋았던 점 
                            </div>
                            <div className={styles.good_content}>
                                촉촉한 발림성이 제 피부에 딱이었어요~<br></br>요즘같이 건조한 날씨에 사용하기 너무 좋은것 같아요 ^^
                            </div>
                        </div>
                        <div className={styles.good_review}>
                            <div className={styles.bad}>
                                <MoodBadIcon className={styles.bad_icon}/>아쉬운 점 
                            </div>
                            <div className={styles.bad_content}>
                                크림을 여는 뚜껑이 뻣뻣해서 쉽게 열리질 않아요 ㅠㅠ <br></br>이 부분 개선해주시면 더 애용할게요~~
                            </div>
                        </div>
                        <img className={styles.review_image} src={process.env.PUBLIC_URL + '/images/review_sample2.PNG'} alt="리뷰사진2"/>
                    </div>
                </Grid>
                <Grid item xs={1}>
                    <div>
                         <ThumbUpIcon className={styles.like_icon}/>
                         <ThumbDownIcon className={styles.unlike_icon}/>
                    </div>
                    <div className={styles.des}>
                      <span className={styles.help}>도움</span>
                      <span>신고</span>
                    </div>
                   
                </Grid>
            </Grid>
        </div>
    );
}

export default ReviewItem;