import React from 'react';
import styles from './youtube.module.css';
import VideoItem from './youtube_item';

const YoutubeList = (props) => {
    return (
        <div>
            <div className={styles.head}>
                <img className={styles.youtube_icon} src={process.env.PUBLIC_URL + '/images/youtube_icon.png'} alt="유튜브아이콘"/>
                <span className={styles.main_title}>관련 Youtube영상</span>
            </div>
            <p className={styles.sub}>인기영상으로 상세정보를 알아보세요.</p>
            <ul className={styles.videos}>
                {props.videos.map(video => (
                    <VideoItem key={video.id} video={video} />
                ))}
            </ul>
        </div>
    );
}

export default YoutubeList;