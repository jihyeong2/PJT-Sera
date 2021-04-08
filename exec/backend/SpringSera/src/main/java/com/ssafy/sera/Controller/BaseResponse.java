package com.ssafy.sera.Controller;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "서버측에서 클라이언트 쪽으로 데이터를 보낼 때의 객체", description = "보내는 데이터를 감싸주는 객체")
public class BaseResponse<T> {
    private String status;
    private T data;
}
