package com.ssafy.sera.Controller;


import com.ssafy.sera.Controller.Request.FindPasswordRequest;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Service.AuthService;
import com.ssafy.sera.Service.UserService;
import com.ssafy.sera.Util.Validator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Api
@RestController
@RequestMapping("v1/auth")
@CrossOrigin(origins = {"*"})
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final Validator validator;
    private final UserService userService;
    private static List<SMSResponse> smsResponses = new ArrayList<>();

    @ApiOperation(value = "인증번호 요청", notes = "마이페이지 / 회원가입 SMS 요청",response = BaseResponse.class)
    @PostMapping
    public BaseResponse postAuthNumber
            (@ApiParam(value = "휴대폰 번호") @RequestParam(required = false) String phoneNumber){
        BaseResponse response = null;
        try{
            Random random = new Random();
            String secret = "";
            for(int i= 0 ; i < 6; i++){
                secret += Integer.toString(random.nextInt(10));
            }
//            authService.sendSMS(validator.phoneValidator(phoneNumber),secret);
            if(40 <= smsResponses.size()){
                smsResponses.remove(0);
            }
            smsResponses.add(new SMSResponse(secret));
            System.out.println(secret);
            response = new BaseResponse("success", "true");
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "인증번호 요청", notes = "비밀번호 찾기 SMS 요청",response = BaseResponse.class)
    @PostMapping("/findPassword")
    public BaseResponse postAuthNumberToFindPassword
            (@ApiParam(value = "휴대폰 번호") @RequestBody FindPasswordRequest request){
        BaseResponse response = null;
        try{
            User user = userService.findByUserLoginId(request.getUserLoginId());
            System.out.println(user.getUserLoginId());
            System.out.println(request.getUserPhone());
            if(!user.getUserPhone().equals(request.getUserPhone())){
                response = new BaseResponse("fail", "일치하지 않음");
            }else{
                Random random = new Random();
                String secret = "";
                for(int i= 0 ; i < 6; i++){
                    secret += Integer.toString(random.nextInt(10));
                }
//                authService.sendSMS(validator.phoneValidator(request.getUserPhone()),secret);
                if(40 <= smsResponses.size()){
                    smsResponses.remove(0);
                }
                smsResponses.add(new SMSResponse(secret));
                response = new BaseResponse("success", "true");
            }
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
            if(!smsResponses.isEmpty()){
                for(SMSResponse sms : smsResponses){
                    if(sms.getCertificateNum().equals(certificateNum)){
                        smsResponses.remove(sms);
                        response = new BaseResponse("success","true");
                        return response;
                    }
                }
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
