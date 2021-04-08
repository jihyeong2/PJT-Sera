import React, {  useState } from "react";
import styles from './review_modify_modal.module.css';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import http from "../../../http-common.js";
import {connect} from 'react-redux';
import Swal from 'sweetalert2';

const ReviewModify = ({user,product, reviewOrigin, index, onModifyReview}) => {
    console.log(user);
    const [fileName, setFileName] =  useState(reviewOrigin.reviewImg===null ? "파일을 선택해주세요" : reviewOrigin.reviewImg.split('_')[1]);
    const [imageFile, setImageFile] = useState(null);

    const [review, setReview] = useState({...reviewOrigin});

    const changeFileName = (e) => {
        const fileName = e.target.value;
        var fileExt = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase(); //파일 확장자명
        if (fileExt !== '.jpg' && fileExt !== '.png' && fileExt !== '.gif') {
            Swal.fire({
                icon: 'error',
                text: "png, jpg형식의 사진만 업로드 가능합니다",
                showConfirmButton: false,
                timer: 1000
              });
            return;
        }

        var maxSize = 1024 * 1024; //10mb
        if (e.target.files[0].size > maxSize) {
            Swal.fire({
                icon: 'error',
                text: "1MB이하의 파일만 업로드 가능합니다",
                showConfirmButton: false,
                timer: 1000
              });
            return;
        }
        setFileName(e.target.value);
        setImageFile(e.target.files[0]);
    };

    const onChangeInput = (e) => {
        console.log(e.target.name);
        setReview({
            ...review,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('file', imageFile); //첨부파일

        if (review.reviewGoodContent.length < 20 || review.reviewBadContent.length < 20) {
            Swal.fire({
                icon: 'error',
                text: "리뷰는 20자 이상 작성해주세요",
                showConfirmButton: false,
                timer: 1000
              });
            return;
        }
        formData.append('request', new Blob([JSON.stringify(review)], { type: "application/json" }));
        console.log(review);
        http.put("v1/review", formData, {
            headers: {
                "Content-Type": `multipart/form-data`,
            }
        })
            .then((res) => {
                if (res.data.status === "success") {
                    Swal.fire({
                        icon: 'success',
                        text: '리뷰가 수정되었습니다',
                        showConfirmButton: false,
                        timer: 1000
                      });
                    onModifyReview();
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        text: '리뷰 수정을 실패했습니다',
                        showConfirmButton: false,
                        timer: 1000
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
                            name="reviewScore"
                            defaultValue={review.reviewScore}
                            precision={1}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            onChange={onChangeInput}
                        />
                    </Box>
                </div>
                <div className={styles.good}>
                    <h3>😀 좋았던 점<span>(최소 20자 이상)</span></h3>
                    <p>
                        <textarea rows="10" name="reviewGoodContent" className={styles.good_text} value={review.reviewGoodContent} onChange={onChangeInput} placeholder="상품을 사용하면서 좋았던 점을 적어주세요"></textarea>
                    </p>
                </div>
                <div className={styles.bad}>
                    <h3>😥 아쉬운 점<span>(최소 20자 이상)</span></h3>
                    <p>
                        <textarea rows="10" name="reviewBadContent" className={styles.bad_text} value={review.reviewBadContent} onChange={onChangeInput} placeholder="상품을 사용하면서 아쉬웠던 점을 적어주세요"></textarea>
                    </p>
                </div>
                <div className={styles.picture}>
                    <h3>📸 사진변경</h3>
                    <div className={styles.fileBox}>
                        <span class={styles.fileName}>{fileName}</span>
                        <label>
                            <input type="file" name="picture" accept="image/png, image/jpeg" className={styles.fileInput} onChange={changeFileName} />
                        </label>
                    </div>
                    <span>* 사진은 1MB이하의 PNG, JPG 파일만 등록 가능합니다.</span>
                    <br></br> <span>* 변경할 사진을 선택해주세요. </span>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.all_btns}>
                        <input className={styles.wrtieBtn} type="button" value="수정하기" onClick={onSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user.user,
  })
  export default connect(
    mapStateToProps,
  )(ReviewModify);