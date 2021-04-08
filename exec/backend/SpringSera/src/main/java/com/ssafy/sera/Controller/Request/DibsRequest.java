package com.ssafy.sera.Controller.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "찜하기 객체", description = "사용자의 아이디와 상품의 아이디 값을 넘긴다.")
public class DibsRequest {
    public String userLoginId;
    public Long itemId;
}
