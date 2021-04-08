import { FreeBreakfastRounded } from "@material-ui/icons";
import React, {useState, useEffect} from "react";
import styles from "./review_chart.module.css";

const ReviewChart = ({grade}) => {

  return (
    <div className={styles.graph_area}>
      <ul className={styles.graph_list}>
        <li>
          <span className={styles.per}>{Math.ceil((grade.star_5 / grade.star_cnt)*100)}%</span>
          <div className={styles.graph}>
            <span style={{height: Math.ceil((grade.star_5 / grade.star_cnt)*100)}}></span>
          </div>
          <span className={styles.txt}>5점</span>
        </li>
        <li>
          <span className={styles.per}>{Math.ceil((grade.star_4 / grade.star_cnt)*100)}%</span>
          <div className={styles.graph}>
            <span style={{height: Math.ceil((grade.star_4 / grade.star_cnt)*100)}}></span>
          </div>
          <span className={styles.txt}>4점</span>
        </li>
        <li>
          <span className={styles.per}>{Math.ceil((grade.star_3 / grade.star_cnt)*100)}%</span>
          <div className={styles.graph}>
            <span style={{height: Math.ceil((grade.star_3 / grade.star_cnt)*100)}}></span>
          </div>
          <span className={styles.txt}>3점</span>
        </li>
        <li>
          <span className={styles.per}>{Math.ceil((grade.star_2 / grade.star_cnt)*100)}%</span>
          <div className={styles.graph}>
            <span style={{height: Math.ceil((grade.star_2 / grade.star_cnt)*100)}}></span>
          </div>
          <span className={styles.txt}>2점</span>
        </li>
        <li>
          <span className={styles.per}>{Math.ceil((grade.star_1 / grade.star_cnt)*100)}%</span>
          <div className={styles.graph}>
            <span style={{height: Math.ceil((grade.star_1 / grade.star_cnt)*100)}}></span>
          </div>
          <span className={styles.txt}>1점</span>
        </li>
      </ul>
    </div>
  );
};

export default ReviewChart;
