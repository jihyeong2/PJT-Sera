import { FreeBreakfastRounded } from "@material-ui/icons";
import React, {useState, useEffect} from "react";
import styles from "./review_chart.module.css";

const ReviewChart = ({}) => {


  return (
    <div className={styles.graph_area}>
      <ul className={styles.graph_list}>
        <li>
          <span className={styles.per}>1%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>5점</span>
        </li>
        <li>
          <span className={styles.per}>1%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>4점</span>
        </li>
        <li>
          <span className={styles.per}>1%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>3점</span>
        </li>
        <li>
          <span className={styles.per}>1%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>2점</span>
        </li>
        <li>
          <span className={styles.per}>1%</span>
          <div className={styles.graph}>
            <span></span>
          </div>
          <span className={styles.txt}>1점</span>
        </li>
      </ul>
    </div>
  );
};

export default ReviewChart;
