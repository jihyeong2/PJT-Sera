package com.ssafy.sera.Controller;

import com.ssafy.sera.Domain.User;
import com.ssafy.sera.Domain.UserDto;
import com.ssafy.sera.Service.UserService;
import com.ssafy.sera.Util.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final Validator validator;
    @PostMapping("/signIn")
    public BaseResponse signIn(@RequestBody UserRequest request){
        BaseResponse response = null;
        try{
            request.setUserPhone(validator.phoneValidator(request.getUserPhone()));
            User user = User.createUser(request);
            userService.save(user);
            response = new BaseResponse("success", "성공적으로 가입");
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
                    .map(m-> new UserDto(m.getUserId(), m.getUserLoginId(), m.getUserPassword(), m.getUserNickname(), m.getUserAge(), m.getUserPhone(), m.getUserGender()))
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

    @GetMapping("/duplicate/{userLoginId}")
    public BaseResponse duplicateUserLoginId(@PathVariable String userLoginId){
        BaseResponse response = null;
        try{
            boolean isDuplicate = userService.validateDuplicateUserLoginId(userLoginId);
            if(isDuplicate){
                response = new BaseResponse("success", "중복입니다");
            }else{
                response = new BaseResponse("success", "중복이 아닙니다");
            }
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @GetMapping("/duplicate/nickname/{userNickname}")
    public BaseResponse duplicateUserNickname(@PathVariable String userNickname){
        BaseResponse response = null;
        try{
            boolean isDuplicate = userService.validateDuplicateNickname(userNickname);
            if(isDuplicate){
                response = new BaseResponse("success", "중복입니다");
            }else{
                response = new BaseResponse("success", "중복이 아닙니다");
            }
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @PutMapping("/{userLoginId}")
    public BaseResponse updateUser(@PathVariable String userLoginId, @RequestBody UserRequest request) {
        BaseResponse response = null;
        try {
            userService.updateUser(userLoginId, request);
            response = new BaseResponse("success", "수정 성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @PutMapping("/password")
    public BaseResponse updatePassword(@RequestBody PasswordRequest request) {
        BaseResponse response = null;
        try {
            userService.updatePassword(request);
            response = new BaseResponse("success", "수정 성공");
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
