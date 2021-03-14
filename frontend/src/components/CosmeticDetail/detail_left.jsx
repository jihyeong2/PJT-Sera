import React from "react";
import styles from "./detail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Detail = () => (
  <div className={styles.detail_left}>
    <img
      className={styles.product_image}
      src={process.env.PUBLIC_URL + "/images/product_Sample.PNG"}
      alt="상품사진"
    />
    <p className={styles.match}>
      <span className={styles.match_name}>일치율 </span>
      <span className={styles.match_percent}>80%</span>
    </p>
    <div className={styles.icon}>
      <span className={styles.heart_icon}>
        <FontAwesomeIcon icon={["far", "heart"]} size="2x" color="red" />
      </span>
      {/* <FontAwesomeIcon icon={['fas', 'heart']} size="2x" color="red"/> */}
      <span className={styles.share_icon}>
        <FontAwesomeIcon icon="share-alt" size="lg" color="gray" />
      </span>
    </div>
  </div>
);

export default Detail;
