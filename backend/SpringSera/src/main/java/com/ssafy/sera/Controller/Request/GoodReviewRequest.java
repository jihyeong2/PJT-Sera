package com.ssafy.sera.Controller.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "도움 객체", description = "사용자의 아이디와 리뷰 아이디 값을 넘긴다.")
public class GoodReviewRequest {
    public String userLoginId;
    public Long reviewId;
}
