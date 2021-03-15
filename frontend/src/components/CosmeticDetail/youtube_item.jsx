import React from 'react';
import styles from './youtube.module.css';

const YoutubeItem = (props) => {
    return(
        <div className={styles.video}>
            <img className={styles.thumbnail} src={props.video.snippet.thumbnails.medium.url} alt="video thumbnail" />
            <div className={styles.metadata}>
                <p className={styles.title}>{props.video.snippet.title}</p>
                <p className={styles.channel}>{props.video.snippet.channelTitle}</p>
            </div>
        </div>
    );
}

export default YoutubeItem;