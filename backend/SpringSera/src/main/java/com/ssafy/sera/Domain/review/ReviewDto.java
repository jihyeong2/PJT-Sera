package com.ssafy.sera.Domain.review;

import com.ssafy.sera.Domain.Item.ItemDto;
import com.ssafy.sera.Domain.User.UserDto;
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
    private ItemDto item;
    private UserDto user;
    private Date writeDate;
    private String reviewGoodContent;
    private String reviewBadContent;
    private int reviewScore;
    private Long helpCnt;

    public ReviewDto(Review review){
        this.reviewId = review.getReviewId();
        this.reviewImg = review.getReviewImg();
        if(review.getUser() != null){
            user = new UserDto();
            this.user.setUserLoginId(review.getUser().getUserLoginId());
        }
        if(review.getItem() != null){
            item = new ItemDto();
            this.item.setItemId(review.getItem().getItemId());
        }
        this.writeDate = review.getWriteDate();
        this.reviewGoodContent = review.getReviewGoodContent();
        this.reviewBadContent = review.getReviewBadContent();
        this.reviewScore = review.getReviewScore();
        this.helpCnt = review.getHelpCnt();
    }
}
