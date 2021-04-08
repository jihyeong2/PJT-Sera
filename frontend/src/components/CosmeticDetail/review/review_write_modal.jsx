import React, { useState } from "react";
import styles from './review_write_modal.module.css';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import http from "../../../http-common.js";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';

const ReviewWrite = ({product, user, onCreateReview}) => {

    const [fileName, setFileName] = useState("파일을 선택해주세요");
    const [imageFile, setImageFile] = useState("");
    const [review_score, setReviewScore] = useState(1);
    const [review_good_content, setReviewGoodContent] = useState("");
    const [review_bad_content, setReviewBadContent] = useState("");

    const changeFileName = (e) => {
        const fileName = e.target.value;
        var fileExt = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase(); //파일 확장자명
        if (fileExt !== '.jpg' && fileExt !== '.png' && fileExt !== '.gif') {
            Swal.fire({
                icon: 'error',
                text: "png, gif, jpg형식의 사진만 업로드 가능합니다",
                showConfirmButton: false,
                timer: 2000
              });
            return;
        }

        var maxSize = 1024 * 1024; //10mb
        if (e.target.files[0].size > maxSize) {
            Swal.fire({
                icon: 'error',
                text: "1MB이하의 파일만 업로드 가능합니다",
                showConfirmButton: false,
                timer: 2000
              });
            return;
        }
        setFileName(e.target.value);
        setImageFile(e.target.files[0]);
    };

    const changeReviewScore = (e) => {
        setReviewScore(e.target.value);
    }

    const changeReviewGood = (e) => {
        setReviewGoodContent(e.target.value);
    }

    const changeReviewBad = (e) => {
        setReviewBadContent(e.target.value);
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('file', imageFile); //첨부파일

        if (review_good_content.length < 20 || review_bad_content.length < 20) {
            Swal.fire({
                icon: 'error',
                text: "리뷰는 20자 이상 작성해주세요",
                showConfirmButton: false,
                timer: 2000
              });
            return;
        }

        const review = {
            userLoginId: user.userLoginId, // 유저아이디
            itemId: product.item_id, // 상품 아이디
            reviewScore: review_score, //별점
            reviewGoodContent: review_good_content, //좋았던점
            reviewBadContent: review_bad_content, //아쉬운점
            helpCnt: 0, //도움ㄴ
            
        }
        console.log(review);
        formData.append('request', new Blob([JSON.stringify(review)], { type: "application/json" }));
        console.log(formData);
        http.post("v1/review", formData, {
            headers: {
                "Content-Type": `multipart/form-data`,
            }
        })
            .then((res) => {
                if (res.data.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: '리뷰가 등록되었습니다',
                        showConfirmButton: false,
                        timer: 2000
                      });
                    onCreateReview();
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        text: '리뷰 작성을 실패했습니다',
                        showConfirmButton: false,
                        timer: 2000
                      });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }


    return (
        <div className={styles.modal_i}>
            <div className={styles.modal_img}>
                <img className={styles.modal_product_img} src={product.item_img} alt="상품사진" />
            </div>
            <div className={styles.modal_content}>
                {product.rating<0 && <div style={{backgroundColor:'#AF3131'}} className={styles.modal_match}><span className={styles.modal_match_name} >나와 잘 맞지 않아요 👎🏻</span></div>}
                {product.rating>0 && <div style={{backgroundColor:'#4E9157'}} className={styles.modal_match}><span className={styles.modal_match_name} >나와 잘 맞아요 👍🏻</span></div>}
                {product.rating==0 && <div style={{backgroundColor:'#FAC56A'}} className={styles.modal_match}><span className={styles.modal_match_name} >보통이에요 🤏🏻</span></div>}
                <p className={styles.modal_product_category}>{product.category_large}
                    <ArrowForwardIosIcon fontSize="small" /> {product.category_middle}</p>
                <p className={styles.modal_product_name}>{product.item_name}</p>
                <p><span className={styles.modal_volume}>{product.item_volume} /  </span><span className={styles.modal_price}>{product.item_price}</span></p>
            </div>
            <div className={styles.divs}>
                <div className={styles.star}>
                    <span>상품은 어떠셨나요?</span>
                    <Box className={styles.star_rate} component="fieldset" mb={3} borderColor="transparent">
                        <Rating
                            name="customized-empty"
                            defaultValue={review_score}
                            precision={1}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            onChange={changeReviewScore}
                        />
                    </Box>
                </div>
                <div className={styles.good}>
                    <h3>😀 좋았던 점<span>(최소 20자 이상)</span></h3>
                    <p>
                        <textarea rows="10" className={styles.good_text} onChange={changeReviewGood} placeholder="상품을 사용하면서 좋았던 점을 적어주세요"></textarea>
                    </p>
                </div>
                <div className={styles.bad}>
                    <h3>😥 아쉬운 점<span>(최소 20자 이상)</span></h3>
                    <p>
                        <textarea rows="10" className={styles.bad_text} onChange={changeReviewBad} placeholder="상품을 사용하면서 아쉬웠던 점을 적어주세요"></textarea>
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
                    <span>* 사진은 1MB이하의 PNG, GIF, JPG 파일만 등록 가능합니다.</span>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.all_btns}>
                        <input className={styles.closeBtn} type="button" value="닫기" />
                        <input className={styles.wrtieBtn} type="button" value="작성하기" onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// export default ReviewWrite;
const mapStateToProps = (state) => ({
    user: state.user.user,
  })
  export default connect(
    mapStateToProps,
  )(ReviewWrite);