package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.GoodReview.GoodReview;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByItem(Item item);
    Review findByReviewId(Long reviewId);

    //도움 눌렀는지 찾기
    @Query("select r from GoodReview r where r.userId = :userId and r.reviewId = :reviewId")
    GoodReview findHelpMark(@Param("userId") User user, @Param("reviewId") Review reviewId);
}


