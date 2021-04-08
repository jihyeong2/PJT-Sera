package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.GoodReview.GoodReview;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoodReviewRepository extends JpaRepository<GoodReview, Long> {
    GoodReview findByUserIdAndReviewId(User userId, Review reviewId);
}
