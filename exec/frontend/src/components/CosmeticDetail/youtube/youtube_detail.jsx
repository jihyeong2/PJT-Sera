import React from 'react';
import styles from './youtube_detail.module.css';

const YoutubeDetail = ({video, video:{snippet}}) => (
    <section className={styles.youtube_detail}>
        <iframe 
            className={styles.youtube}
            type="text/html" width="100%" height="400px"
            src={`https://www.youtube.com/embed/${video.id}`}
            frameborder="0" allowfullscreen>    
        </iframe>
        <div className={styles.youtube_content}>
            <p className={styles.title}>{snippet.title}</p>
            <p className={styles.channelTitle}>{snippet.channelTitle}</p>
            <div className={styles.bar}></div>
            <pre className={styles.description}>{snippet.description}</pre>
        </div>
    </section>
);

export default YoutubeDetail;