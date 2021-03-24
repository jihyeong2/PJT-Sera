package com.ssafy.sera.Controller.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "상품검색을 위한 객체", description = "이름과 카테고리고 구분하고, 아이디로 찜했는가 판별한다")
public class SearchRequest {
    private String userLoginId;
    private String categoryLarge;
    private String searchWord;
}
