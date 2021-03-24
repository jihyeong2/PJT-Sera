package com.ssafy.sera.Controller.Request;

import lombok.Data;

@Data
public class FindPasswordRequest {
    private String userLoginId;
    private String userPhone;
}
