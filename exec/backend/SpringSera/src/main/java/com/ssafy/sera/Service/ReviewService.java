package com.ssafy.sera.Service;

import com.ssafy.sera.Controller.Request.ReviewRequest;
import com.ssafy.sera.Controller.Request.UserRequest;
import com.ssafy.sera.Domain.GoodReview.GoodReview;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Domain.review.ReviewDto;
import com.ssafy.sera.Repository.ReviewRepository;
import com.ssafy.sera.Util.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
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
    @Transactional
    public List<Review> findByItem(User user, Item item) {
        List<Review> reviewList = reviewRepository.findByItem(item);
        for(Review r : reviewList){
            if(reviewRepository.findHelpMark(user, r) != null) r.setHelpMark(1);
            else r.setHelpMark(0);
        }
        return reviewList;

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
    public void updateReview(ReviewRequest request, MultipartFile file) throws IOException {
        Optional<Review> findReview = Optional.ofNullable(reviewRepository.findByReviewId(request.getReviewId()));
        if(findReview.isPresent()) {
            if(file != null) { //사진 파일 업로드 했으면
                if(findReview.get().getReviewImg()!=null) s3Service.delete(findReview.get().getReviewImg()); //현재 리뷰에 이미지가 있었다면 url s3에서 삭제
                String review_img = s3Service.upload(file); //파일 s3에 업로드
                findReview.get().setReviewImg(review_img);
            }
            findReview.get().setWriteDate(request.getWriteDate());
            findReview.get().setReviewGoodContent(request.getReviewGoodContent());
            findReview.get().setReviewBadContent(request.getReviewBadContent());
            findReview.get().setReviewScore(request.getReviewScore());
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
            //s3 이미지 삭제
            if(deleteReview.get().getReviewImg() != null) s3Service.delete(deleteReview.get().getReviewImg());
            reviewRepository.delete(deleteReview.get());
        }
    }

    /**
     * 현재 리뷰에 도움 눌렀는지 상태 가져오기
     * @return
     */
    @Transactional
    public GoodReview findHelpMark(User userId, Review reviewId){
        return reviewRepository.findHelpMark(userId, reviewId);
    }

    public List<String> findPhotoRecent(Item item) {
        int cnt = 0;
        List<String> totalImgList = reviewRepository.findPhotoRecent(item);
        List<String> top8ImgList = new ArrayList<>();
        while(cnt < 8){
            if(cnt > totalImgList.size()) break;
            top8ImgList.add(totalImgList.get(cnt));
            cnt++;
        }
        return top8ImgList;
    }

    public List<Review> findRecentList(User user, Item item) {
        List<Review> reviewList = reviewRepository.findRecentList(item);
        for(Review r : reviewList){
            if(reviewRepository.findHelpMark(user, r) != null) r.setHelpMark(1);
            else r.setHelpMark(0);
        }
        return reviewList;
    }

    public List<Review> findHelpList(User user, Item item) {
        List<Review> reviewList = reviewRepository.findHelpList(item);
        for(Review r : reviewList){
            if(reviewRepository.findHelpMark(user, r) != null) r.setHelpMark(1);
            else r.setHelpMark(0);
        }
        return reviewList;
    }

    public List<Review> findScoreList(User user, Item item) {
        List<Review> reviewList = reviewRepository.findScoreList(item);
        for(Review r : reviewList){
            if(reviewRepository.findHelpMark(user, r) != null) r.setHelpMark(1);
            else r.setHelpMark(0);
        }
        return reviewList;
    }
}
