package com.ssafy.sera.Controller;

import lombok.Data;

import javax.persistence.Column;

@Data
public class UserRequest {
    private String userEmail;
    private String userPassword;
    private int userAge;
    private String userPhone;
    private String userGender;
}
