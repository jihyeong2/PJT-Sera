import React from 'react';
import styles from './youtube.module.css';

const YoutubeItem = ({video, video:{ snippet }, onVideoClick}) => {
    return(
        <div  onClick={() => onVideoClick(video)}>
            <div className={styles.video}>
                <img className={styles.thumbnail} src={snippet.thumbnails.medium.url} alt="video thumbnail" />
                <div className={styles.metadata}>
                    <p className={styles.title}>{snippet.title}</p>
                    <p className={styles.channel}>{snippet.channelTitle}</p>
                </div>
            </div>
        </div>
    );
}

export default YoutubeItem;