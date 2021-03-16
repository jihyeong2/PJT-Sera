import React, {useEffect, useState} from 'react';
import DetailLeft from '../../components/CosmeticDetail/detail_left';
import DetailRight from '../../components/CosmeticDetail/detail_right';
import Youtube from '../../components/CosmeticDetail/youtube_list';
import Review from '../../components/CosmeticDetail/review';
import styles from './CosmeticDetail.module.css'
import Grid from '@material-ui/core/Grid';

const CosmeticDetail = ( ) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=5&key=AIzaSyAIAN4fWbhQxYcuLU-cnjAGihX695m5azE", requestOptions)
            .then(response => response.json())
            .then(result => setVideos(result.items))
            .catch(error => console.log('error', error));
    }, []); // 마운트가 되었을 때만 호출

    return (
        <div className={styles.page}>
            <Grid container spacing={4}>
            <Grid item xs={4} className={styles.detail}>
                <DetailLeft />
            </Grid>
            <Grid item xs={8} className={styles.detail}>
                <DetailRight />
            </Grid>
            <Grid item xs={12} className={styles.youtube}>
                <Youtube videos={videos} />
            </Grid>
            <div className={styles.bar}></div>
            <Grid item xs={12} className={styles.review}>
                <Review />
            </Grid>
            </Grid>
        </div>
    );
  }

  export default CosmeticDetail;
