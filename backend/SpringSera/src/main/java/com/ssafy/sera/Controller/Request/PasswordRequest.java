package com.ssafy.sera.Controller.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "비밀번호 변경시 사용되는 요청", description = "로그인 정보와 변경할 패스워드 정보")
public class PasswordRequest {
    private String userLoginId;
    private String userPassword;
}
