import React from "react";
import styles from "./review_chart.module.css";

const ReviewChart = () => {
  return (
    <div className={styles.graph_area}>
      <ul className={styles.graph_list}>
        <li>
          <span className={styles.per}>11%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>5점</span>
        </li>
        <li>
          <span className={styles.per}>22%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>4점</span>
        </li>
        <li>
          <span className={styles.per}>33%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>5점</span>
        </li>
        <li>
          <span className={styles.per}>44%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>5점</span>
        </li>
        <li>
          <span className={styles.per}>55%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>5점</span>
        </li>
      </ul>
    </div>
  );
};

export default ReviewChart;
