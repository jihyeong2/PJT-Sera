package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.GoodReview.GoodReview;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.PrePersist;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    @Query("select r from Review r where r.item = :item order by r.writeDate asc")
    List<Review> findByItem(Item item); //default:등록순
    Review findByReviewId(Long reviewId);

    //도움 눌렀는지 찾기
    @Query("select r from GoodReview r where r.userId = :userId and r.reviewId = :reviewId")
    GoodReview findHelpMark(@Param("userId") User user, @Param("reviewId") Review reviewId);

    //사진리뷰 최신순 8장 가져오기
    @Query("select r.reviewImg from Review r where length(r.reviewImg) >= 5 and r.item = :item order by r.writeDate desc")
    List<String> findPhotoRecent(Item item);

    //리뷰리스트 최신순 정렬
    @Query("select r from Review r where r.item = :item order by r.writeDate desc")
    List<Review> findRecentList(Item item);

    //리뷰리스트 도움순 정렬
    @Query("select r from Review r where r.item = :item order by r.helpCnt desc")
    List<Review> findHelpList(Item item);

    //리뷰리스트 별점순 정렬
    @Query("select r from Review r where r.item = :item order by r.reviewScore desc")
    List<Review> findScoreList(Item item);
}


