package com.ssafy.sera.Controller;

import io.swagger.annotations.ApiModel;
import lombok.Data;

import javax.persistence.Column;

@Data
@ApiModel(value = "클라이언트 측에서 보내주는 User 객체 정보", description = "회원가입 시 사용된다.")
public class UserRequest {
    private Long userId;
    private String userLoginId;
    private String userPassword;
    private String userNickname;
    private int userAge;
    private String userPhone;
    private String userGender;
    private String skinId;
    private String skinType;
}
