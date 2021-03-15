package com.ssafy.sera.Controller;

import com.ssafy.sera.Domain.User;
import com.ssafy.sera.Service.JwtService;
import com.ssafy.sera.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/login")
@RequiredArgsConstructor
public class LoginController {
    private final JwtService jwtService;
    private final UserService userService;

    public static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserRequest userRequest, HttpServletResponse response, HttpSession session){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;
        try{
            User loginUser = userService.findByUserLoginIdAndUserPassword(userRequest.getUserLoginId(), userRequest.getUserPassword());
            if(loginUser!=null){
                String token = jwtService.create(loginUser);
                logger.trace("로그인 토큰정보 : {}", token);
                response.setHeader("auth-token", token);
                resultMap.put("auth-token",token);
                resultMap.put("status", true);
//                resultMap.put("user", loginUser);
                resultMap.put("message", "login success");
            }
            else{
                loginUser = userService.findByUserLoginId(userRequest.getUserLoginId());
                if(loginUser != null){
                    resultMap.put("message", "로그인 실패 : 비밀번호가 틀렸습니다.");
                }else{
                    resultMap.put("message", "로그인 실패 : 존재하지 않는 아이디입니다.");
                }
            }
            status = HttpStatus.ACCEPTED;
        }catch(Exception e){
            logger.error("로그인 실패 : {}", e);
            resultMap.put("message", e.getMessage());
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

}
