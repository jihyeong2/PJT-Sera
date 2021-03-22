package com.ssafy.sera.Controller;

import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.User.UserDto;
import com.ssafy.sera.Service.SkinService;
import com.ssafy.sera.Service.UserService;
import com.ssafy.sera.Util.Validator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final SkinService skinService;
    private final Validator validator;

    @ApiOperation(value = "회원가입", notes = "가입 성공시 BaseResponse에 data값으로 '성공적으로 가입' 설정 후 반환", response = BaseResponse.class)
    @PostMapping("/signIn")
    public BaseResponse signIn(@ApiParam(value = "사용자 객체") @RequestBody UserRequest request){

        BaseResponse response = null;
        try{
            request.setUserPhone(validator.phoneValidator(request.getUserPhone()));
            Skin  skin = skinService.findBySkinType(request.getSkinType());
            User user = User.createUser(request, skin);
            userService.save(user);
            response = new BaseResponse("success", "성공적으로 가입");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail",e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "모든 유저 목록 불러오기", notes = "모든 유저정보를 반환 List 형식으로", response = BaseResponse.class)
    @GetMapping
    public BaseResponse findUsers(){
        BaseResponse response = null;
        try{
            List<User> findUsers = userService.findAll();
            List<UserDto> collect = findUsers.stream()
                    .map(m-> new UserDto(m))
                    .collect(Collectors.toList());
            response = new BaseResponse("success", collect);
        }
        catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @ApiOperation(value = "유저 한명 찾기", notes = "모든 유저정보를 반환 List 형식으로", response = BaseResponse.class)
    @GetMapping("/{userLoginId}")
    public BaseResponse findUser(@ApiParam(value = "사용자 로그인 아이디") @PathVariable String userLoginId){
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

    @ApiOperation(value = "아이디 중복여부 검사", notes = "반환되는 data값은 중복입니다 / 중복이 아닙니다", response = BaseResponse.class)
    @GetMapping("/duplicate/{userLoginId}")
    public BaseResponse duplicateUserLoginId(@ApiParam(value = "사용자 로그인 아이디")@PathVariable String userLoginId){
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

    @ApiOperation(value = "닉네임 중복여부 검사", notes = "반환되는 data값은 중복입니다 / 중복이 아닙니다", response = BaseResponse.class)
    @GetMapping("/duplicate/nickname/{userNickname}")
    public BaseResponse duplicateUserNickname(@ApiParam(value = "사용자 닉네임")@PathVariable String userNickname){
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
    @ApiOperation(value = "사용자 정보 업데이트", notes = "반환되는 데이터는 수정 성공 / 에러 메시지", response = BaseResponse.class)
    @PutMapping("/{userLoginId}")
    public BaseResponse updateUser(@ApiParam(value = "사용자 로그인 아이디")@PathVariable String userLoginId,
                                   @ApiParam(value = "사용자 객체")@RequestBody UserRequest request) {
        BaseResponse response = null;
        try {
            userService.updateUser(userLoginId, request);
            response = new BaseResponse("success", "수정 성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "비밀번호 업데이트", notes = "반환되는 데이터는 수정 성공 / 에러 메시지", response = BaseResponse.class)
    @PutMapping("/password")
    public BaseResponse updatePassword(@ApiParam(value = "패스워드 수정 정보(아이디, 패스워드)")@RequestBody PasswordRequest request) {

        BaseResponse response = null;
        try {
            userService.updatePassword(request);
            response = new BaseResponse("success", "수정 성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "회원 삭제", notes = "반환되는 데이터는 삭제 성공 / 에러 메시지", response = BaseResponse.class)
    @DeleteMapping("/{userLoginId}")
    public BaseResponse deleteUser(@ApiParam(value = "사용자 로그인 정보")@PathVariable String userLoginId){
        BaseResponse response = null;
        try {
            userService.deleteUser(userLoginId);
            response = new BaseResponse("success", "삭제 성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "사용자 피부 설정", notes = "반환되는 데이터는 성공 / 에러메시지", response =BaseResponse.class)
    @PostMapping("/skin/{userLoginId}/{skinType}")
    public BaseResponse updateUserSkin(@ApiParam(value = "Skin 정보")
                                           @PathVariable String userLoginId,
                                           @PathVariable String skinType){
        BaseResponse response = null;
        try{
            System.out.println(skinType);
            Skin skin = skinService.findBySkinType(skinType);
            System.out.println(skin.getSkinId()+" "+skin.getSkinType());
            userService.updateSkinType(userLoginId, skin);
            response = new BaseResponse("success", "성공");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
}
