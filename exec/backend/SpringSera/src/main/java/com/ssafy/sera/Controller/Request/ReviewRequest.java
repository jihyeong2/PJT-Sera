package com.ssafy.sera.Controller.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import java.util.Date;

@Data
@ApiModel(value = "리뷰 객체", description = "클라이언트측에서 보내주는 리뷰객체 정보")
public class ReviewRequest {
    private Long reviewId;
    private String reviewImg;
    private Long itemId;
    private String userLoginId;
    private Date writeDate;
    private String reviewGoodContent;
    private String reviewBadContent;
    private int reviewScore;
    private Long helpCnt;
}
