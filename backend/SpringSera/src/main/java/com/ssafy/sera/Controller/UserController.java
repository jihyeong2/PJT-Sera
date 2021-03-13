package com.ssafy.sera.Controller;

import com.ssafy.sera.Domain.User;
import com.ssafy.sera.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping("/signIn")
    public BaseResponse signIn(@RequestBody UserRequest request){
        BaseResponse response = null;
        try{
            User user = User.createUser(request);
            userService.save(user);
            response = new BaseResponse("success", "성공적으로 입력");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail",e.getMessage());
        }
        return response;
    }
}
