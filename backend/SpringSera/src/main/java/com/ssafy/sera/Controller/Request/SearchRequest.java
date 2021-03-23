package com.ssafy.sera.Controller.Request;

import lombok.Data;

@Data
public class SearchRequest {
    private String userLoginId;
    private String searchWord;
}
