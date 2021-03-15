package com.ssafy.sera.Util;

import org.springframework.stereotype.Component;

@Component
public class Validator {
    public String phoneValidator(String phoneNumber){
        return phoneNumber.replaceAll("-", "");
    }
}
