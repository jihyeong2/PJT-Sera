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

    @GetMapping
    public BaseResponse getAuthNumber(@RequestParam(required = false) String phoneNumber){
        BaseResponse response = null;

        try{
            Random random = new Random();
            String secret = "";
            for(int i= 0 ; i < 6; i++){
                secret += Integer.toString(random.nextInt(10));
            }
            authService.sendSMS(validator.phoneValidator(phoneNumber),secret);
            response = new BaseResponse("success", new SMSResponse(secret));
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
