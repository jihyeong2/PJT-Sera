package com.ssafy.sera.Domain.GoodReview;

import com.ssafy.sera.Controller.Request.GoodReviewRequest;
import com.ssafy.sera.Controller.Request.ItemRequest;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class GoodReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goodReviewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "review_id")
    private Review reviewId;

    public GoodReview (User user, Review item){
        this.userId = user;
        this.reviewId = item;
    }
}

