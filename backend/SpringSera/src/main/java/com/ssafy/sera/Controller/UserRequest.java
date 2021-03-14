package com.ssafy.sera.Controller;

import lombok.Data;

import javax.persistence.Column;

@Data
public class UserRequest {
    private String userLoginId;
    private String userPassword;
    private String userName;
    private int userAge;
    private String userPhone;
    private String userGender;
}
