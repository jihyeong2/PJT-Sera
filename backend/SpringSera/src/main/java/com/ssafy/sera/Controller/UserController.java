package com.ssafy.sera.Controller;

import com.ssafy.sera.Domain.User;
import com.ssafy.sera.Domain.UserDto;
import com.ssafy.sera.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping
    public BaseResponse findUsers(){
        BaseResponse response = null;
        try{
            List<User> findUsers = userService.findAll();
            List<UserDto> collect = findUsers.stream()
                    .map(m-> new UserDto(m.getUserId(), m.getUserLoginId(), m.getUserPassword(), m.getUserName(), m.getUserAge(), m.getUserPhone(), m.getUserGender()))
                    .collect(Collectors.toList());
            response = new BaseResponse("success", collect);
        }
        catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @GetMapping("/{userLoginId}")
    public BaseResponse findUser(@PathVariable String userLoginId){
        BaseResponse response = null;
        try{
            User findUser = userService.findByUserLoginId(userLoginId);
            UserDto userDto = new UserDto(findUser);
            response = new BaseResponse("success", userDto);
        }
        catch(IllegalStateException e){
            response = new BaseResponse("fail",e.getMessage());
        }
        return response;
    }
    @PutMapping("/{userLoginId}")
    public BaseResponse updateUser(@PathVariable String userLoginId, @RequestBody UserRequest request) {
        BaseResponse response = null;
        try {
            userService.updateUser(userLoginId, request);
            response = new BaseResponse("success", "수정성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @DeleteMapping("/{userLoginId}")
    public BaseResponse deleteUser(@PathVariable String userLoginId){
        BaseResponse response = null;
        try {
            userService.deleteUser(userLoginId);
            response = new BaseResponse("success", "삭제 성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
}
