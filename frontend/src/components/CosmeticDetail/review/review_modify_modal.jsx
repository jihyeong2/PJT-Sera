import React, { useEffect, useState } from "react";
import styles from './review_modify_modal.module.css';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import http from "../../../http-common.js";

//★props내려준후 수정예정
const ReviewModify = (props) => {

    const [fileName, setFileName] = useState("파일을 선택해주세요");
    const [imageFile, setImageFile] = useState("");

    //★나중에 props받아온값으로 수정
    const [review, setReview] = useState({
        reviewId: 15,
        reviewImg: '', //이전에 첨부판 사진 이름 보여주기용도
        reviewScore: '',
        reviewGoodContent: '',
        reviewBadContent: '',
    });

    const { reviewId, reviewImg, reviewScore, reviewGoodContent, reviewBadContent } = review;
    const changeFileName = (e) => {
        const fileName = e.target.value;
        var fileExt = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase(); //파일 확장자명
        if (fileExt !== '.jpg' && fileExt !== '.png' && fileExt !== '.gif') {
            alert("png, gif, jpg형식의 사진만 업로드 가능합니다");
            return;
        }

        var maxSize = 10 * 1024 * 1024; //10mb
        if (e.target.files[0].size > maxSize) {
            alert("10MB이하의 파일만 업로드 가능합니다");
            return;
        }
        setFileName(e.target.value);
        setImageFile(e.target.files[0]);
    };

    const onChangeInput = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('file', imageFile); //첨부파일

        if (review.reviewGoodContent.length < 20 || review.reviewBadContent.length < 20) {
            alert("리뷰는 20자 이상 작성해주세요");
            return;
        }

        formData.append('request', new Blob([JSON.stringify(review)], { type: "application/json" }));

        http.put("v1/review", formData, {
            headers: {
                "Content-Type": `multipart/form-data`,
            }
        })
            .then((res) => {
                if (res.data.status === "success") alert("리뷰 수정 완료");
                else alert("리뷰 수정 실패");
            })
            .catch((err) => {
                console.error(err);
            });
    }


    return (
        <div className={styles.modal_i}>
            <div className={styles.modal_img}>
                <img className={styles.modal_product_img} src={process.env.PUBLIC_URL + '/images/product_Sample.PNG'} alt="상품사진" />
            </div>
            <div className={styles.modal_content}>
                <div className={styles.modal_match}><span className={styles.modal_match_name} >나랑 맞지 않아요👎🏻</span></div>
                <p className={styles.modal_product_category}>스킨케어 > 세럼</p>
                <p className={styles.modal_product_name}>프로바이오틱스 세라마이드 크림</p>
                <p><span className={styles.modal_volume}>60ml /  </span><span className={styles.modal_price}>35,000원</span></p>
            </div>
            <div className={styles.divs}>
                <div className={styles.star}>
                    <span>상품은 어떠셨나요?</span>
                    <Box className={styles.star_rate} component="fieldset" mb={3} borderColor="transparent">
                        <Rating
                            name="reviewScore"
                            defaultValue={review.reviewScore}
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            onChange={onChangeInput}
                        />
                    </Box>
                </div>
                <div className={styles.good}>
                    <h3>😀 좋았던 점<span>(최소 20자 이상)</span></h3>
                    <p>
                        <textarea rows="10" name="ReviewGoodContent" className={styles.good_text} onChange={onChangeInput} placeholder="상품을 사용하면서 좋았던 점을 적어주세요"></textarea>
                    </p>
                </div>
                <div className={styles.bad}>
                    <h3>😥 아쉬운 점<span>(최소 20자 이상)</span></h3>
                    <p>
                        <textarea rows="10" name="reviewBadContent" className={styles.bad_text} onChange={onChangeInput} placeholder="상품을 사용하면서 아쉬웠던 점을 적어주세요"></textarea>
                    </p>
                </div>
                <div className={styles.picture}>
                    <h3>📸 사진등록</h3>
                    <div className={styles.fileBox}>
                        <span class={styles.fileName}>{fileName}</span>
                        <label>
                            <input type="file" name="picture" className={styles.fileInput} onChange={changeFileName} />
                        </label>
                    </div>
                    <span>* 사진은 10MB이하의 PNG, GIF, JPG 파일만 등록 가능합니다.</span>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.all_btns}>
                        <input className={styles.closeBtn} type="button" value="닫기" />
                        <input className={styles.wrtieBtn} type="button" value="수정하기" onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewModify;