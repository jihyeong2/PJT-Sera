package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Domain.review.ReviewDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByItem(Item item);
    Review findByReviewId(Long reviewId);
}
