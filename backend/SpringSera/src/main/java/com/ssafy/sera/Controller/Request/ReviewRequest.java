package com.ssafy.sera.Controller.Request;

import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.Date;

@Data
@ApiModel(value = "리뷰 정보", description = "리뷰 CRUD에 사용")
public class ReviewRequest {
    private Long reviewId;
    private String reviewImg;
    private Item item;
    private User user;
    private Date writeDate;
    private String reviewGoodContent;
    private String reviewBadContent;
    private int reviewScore;
    private Long helpCnt;
}
