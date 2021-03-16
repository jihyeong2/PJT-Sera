package com.ssafy.sera.Controller;


import com.ssafy.sera.Service.AuthService;
import com.ssafy.sera.Util.Validator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("v1/auth")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final Validator validator;
    private static SMSResponse smsResponse;
    @PostMapping
    public BaseResponse postAuthNumber(@RequestParam(required = false) String phoneNumber){
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

    @GetMapping("/{certificateNum}")
    public BaseResponse GetAuthResult(@PathVariable String certificateNum){
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
