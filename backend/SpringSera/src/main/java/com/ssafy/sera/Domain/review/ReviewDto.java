package com.ssafy.sera.Domain.review;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.sera.Controller.Request.ReviewRequest;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private Long reviewId;
    private String reviewImg;
    private Item item;
    private User user;
    private Date writeDate;
    private String reviewGoodContent;
    private String reviewBadContent;
    private int reviewScore;
    private Long helpCnt;

    public ReviewDto(Review review){
        this.reviewId = review.getReviewId();
        this.reviewImg = review.getReviewImg();
        this.item = review.getItem();
        this.user = review.getUser();
        this.writeDate = review.getWriteDate();
        this.reviewGoodContent = review.getReviewGoodContent();
        this.reviewBadContent = review.getReviewBadContent();
        this.reviewScore = review.getReviewScore();
        this.helpCnt = review.getHelpCnt();
    }
}
