package com.ssafy.sera.Service;

import com.ssafy.sera.Controller.Request.ReviewRequest;
import com.ssafy.sera.Controller.Request.UserRequest;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Domain.review.ReviewDto;
import com.ssafy.sera.Repository.ReviewRepository;
import com.ssafy.sera.Util.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final S3Service s3Service;

    /**
     * 리뷰 등록하기
     * @return
     */
    @Transactional
    public Review save(Review review){
        return reviewRepository.save(review);
    }

    /**
     * 현재 아이템의 전체 리뷰 목록 가져오기
     * @return
     */
    public List<ReviewDto> findByItem(Item item) {
        return reviewRepository.findByItem(item);
    }

    /**
     * 현재 리뷰 상세정보 가져오기
     * @return
     */
    public Review findByReviewId(Long reviewId) { return reviewRepository.findByReviewId(reviewId);}


    /**
     * 현재 리뷰 수정하기
     * @return
     */
    @Transactional
    public void updateReview(ReviewRequest request) {
        Optional<Review> findReview = Optional.ofNullable(reviewRepository.findByReviewId(request.getReviewId()));
        if(findReview.isPresent()) {
            findReview.get().setReviewImg(request.getReviewImg());
            findReview.get().setWriteDate(request.getWriteDate());
            findReview.get().setReviewGoodContent(request.getReviewGoodContent());
            findReview.get().setReviewBadContent(request.getReviewBadContent());
            findReview.get().setReviewScore(request.getReviewScore());
            if(findReview.get().getReviewImg()!=null){

            }
        }
        else{
            throw new IllegalStateException("존재하지 않는 리뷰입니다.");
        }
    }
    /**
     * 현재 리뷰 삭제하기
     * @return
     */
    @Transactional
    public void deleteReview(Long reviewId) {
        Optional<Review> deleteReview = Optional.ofNullable(reviewRepository.findByReviewId(reviewId));
        if(deleteReview.isPresent()){
            reviewRepository.delete(deleteReview.get());
            //s3 이미지 삭제
            if(deleteReview.get().getReviewImg()!=null) s3Service.delete(deleteReview.get().getReviewImg());
        }
    }
}
