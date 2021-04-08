package com.ssafy.sera.Controller.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "비밀번호를 찾기위한 요청객체", description = "아이디로 유저객체를 알아내고, 유저에 포함된 phone번호와 일치하는지 확인용")
public class FindPasswordRequest {
    private String userLoginId;
    private String userPhone;
}
