package com.ssafy.sera.Controller;


import com.ssafy.sera.Service.AuthService;
import com.ssafy.sera.Util.Validator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@Api
@RestController
@RequestMapping("v1/auth")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final Validator validator;
    private static SMSResponse smsResponse;

    @ApiOperation(value = "인증번호 요청", notes = "SMS 요청",response = BaseResponse.class)
    @PostMapping
    public BaseResponse postAuthNumber(@ApiParam(value = "휴대폰 번호") @RequestParam(required = false) String phoneNumber){
        BaseResponse response = null;
        try{
            Random random = new Random();
            String secret = "";
            for(int i= 0 ; i < 6; i++){
                secret += Integer.toString(random.nextInt(10));
            }
            authService.sendSMS(validator.phoneValidator(phoneNumber),secret);
            smsResponse = new SMSResponse();
            smsResponse.setCertificateNum(secret);
            response = new BaseResponse("success", "true");
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "인증번호 확인", notes = "SMS 요청",response = BaseResponse.class)
    @GetMapping("/{certificateNum}")
    public BaseResponse GetAuthResult(@ApiParam(value = "인증번호")@PathVariable String certificateNum){
        BaseResponse response = null;
        try{
            if(certificateNum.equals(smsResponse.getCertificateNum())){
                response = new BaseResponse("success","true");
            }
            else{
                response = new BaseResponse("success", "false");
            }
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    static class SMSResponse {
        String certificateNum;
    }
}
