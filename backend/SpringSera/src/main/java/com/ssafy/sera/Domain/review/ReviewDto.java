package com.ssafy.sera.Domain.review;

import com.ssafy.sera.Domain.Item.ItemDto;
import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.Skin.SkinDto;
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
    private int helpMark; //도움 여부(눌렀으면 1, 안눌렀으면 0)

    public ReviewDto(Review review){
        this.reviewId = review.getReviewId();
        this.reviewImg = review.getReviewImg();
        if(review.getUser() != null){
            user = new UserDto();
            this.user.setUserLoginId(review.getUser().getUserLoginId());
            this.user.setUserAge(review.getUser().getUserAge());
            this.user.setUserNickname(review.getUser().getUserNickname());
            this.user.setUserGender(review.getUser().getUserGender());
            if(review.getUser().getSkinId() != null){
                SkinDto skinDto = new SkinDto();
                skinDto.setSkinId(review.getUser().getSkinId().getSkinId());
                skinDto.setSkinType(review.getUser().getSkinId().getSkinType());
                this.user.setSkinDto(skinDto);
            }
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
