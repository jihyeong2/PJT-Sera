package com.ssafy.sera.Controller;

import lombok.Data;

@Data
public class PasswordRequest {
    private String userLoginId;
    private String userPassword;
}
