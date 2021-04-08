import React from "react";
import styles from "./review_chart.module.css";

const ReviewChart = ({grade}) => {
  return (
    <div className={styles.graph_area}>
      <ul className={styles.graph_list}>
        <li>
          <span className={styles.per}>{grade.star_5 !== 0 ? Math.ceil((grade.star_5 / grade.star_cnt)*100) : 0}%</span>
          <div className={styles.graph}>
            <span style={{height: grade.star_5 !== 0 ? Math.ceil((grade.star_5 / grade.star_cnt)*100) : 0}}></span>
          </div>
          <span className={styles.txt}>5점</span>
        </li>
        <li>
          <span className={styles.per}>{grade.star_4 !== 0 ? Math.ceil((grade.star_4 / grade.star_cnt)*100) : 0}%</span>
          <div className={styles.graph}>
            <span style={{height: grade.star_4 !== 0 ? Math.ceil((grade.star_4 / grade.star_cnt)*100) : 0}}></span>
          </div>
          <span className={styles.txt}>4점</span>
        </li>
        <li>
          <span className={styles.per}>{grade.star_3 !== 0 ? Math.ceil((grade.star_3 / grade.star_cnt)*100) : 0}%</span>
          <div className={styles.graph}>
            <span style={{height: grade.star_3 !== 0 ? Math.ceil((grade.star_3 / grade.star_cnt)*100) : 0}}></span>
          </div>
          <span className={styles.txt}>3점</span>
        </li>
        <li>
          <span className={styles.per}>{grade.star_2 !== 0 ? Math.ceil((grade.star_2 / grade.star_cnt)*100) : 0}%</span>
          <div className={styles.graph}>
            <span style={{height: grade.star_2 !== 0 ? Math.ceil((grade.star_2 / grade.star_cnt)*100) : 0}}></span>
          </div>
          <span className={styles.txt}>2점</span>
        </li>
        <li>
          <span className={styles.per}>{grade.star_1 !== 0 ? Math.ceil((grade.star_1 / grade.star_cnt)*100) : 0}%</span>
          <div className={styles.graph}>
           <span style={{height: grade.star_1 !== 0 ? Math.ceil((grade.star_1 / grade.star_cnt)*100) : 0}}></span>
          </div>
          <span className={styles.txt}>1점</span>
        </li>
      </ul>
    </div>
  );
};

export default ReviewChart;
