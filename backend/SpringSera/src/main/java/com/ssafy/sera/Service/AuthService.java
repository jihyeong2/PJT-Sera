package com.ssafy.sera.Service;

import lombok.RequiredArgsConstructor;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthService {
    public void sendSMS(String phoneNumber, String secret) throws CoolsmsException{
        String api_key = "NCSYY5A9YLKXCP8J";
        String api_secret = "S9GSALZQ0ZID6TPWPI31FXNMXDSJYGW2";

        Message SMS = new Message(api_key, api_secret);
        HashMap<String, String> params = new HashMap<String, String>();
        params.put("to", phoneNumber);
        params.put("from", "01037178951"); //무조건 자기번호 (인증)
        params.put("type", "SMS");
        params.put("text", "Sera 휴대폰 인증입니다.\n인증번호는 "+"["+ secret+"]" + "입니다.");
        params.put("app_version", "test app 1.2"); // application name and version
        SMS.send(params);
    }
}
