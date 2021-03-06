 import React from 'react';
import styles from './youtube.module.css';
import VideoItem from './youtube_item';
import Grid from '@material-ui/core/Grid';

const YoutubeList = ({videos, onVideoClick}) => {
    return (
        <div>
            <div className={styles.head}>
                <img className={styles.youtube_icon} src={process.env.PUBLIC_URL + '/images/youtube_icon.png'} alt="유튜브아이콘"/>
                <span className={styles.main_title}>관련 Youtube영상</span>
            </div>
            <p className={styles.sub}>인기영상으로 상세정보를 알아보세요.</p>
            <Grid className={styles.videos} container spacing={3}>
                {videos.map(video => (
                    <Grid key={video.id} item xs={3} className={styles.youtube_item}>
                        <div>
                            <VideoItem  video={video} onVideoClick={onVideoClick}/>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default YoutubeList;