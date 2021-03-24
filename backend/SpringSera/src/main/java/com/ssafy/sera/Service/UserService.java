package com.ssafy.sera.Service;

import com.ssafy.sera.Controller.Request.ChangePasswordRequest;
import com.ssafy.sera.Controller.Request.UserRequest;
import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    @Transactional
    public User save(User user){
        return userRepository.save(user);
    }
    public User findByUserLoginId(String userLoginId){
        return userRepository.findByUserLoginId(userLoginId);
    }

    public boolean validateDuplicateUserLoginId(String userLoginId){
        if(userRepository.findByUserLoginId(userLoginId)==null){ // null이면 중복X
            return false;
        }else{
            return true;
        }
    }
    public boolean validateDuplicateNickname(String userNickname){
       if(userRepository.findByUserNickname(userNickname)==null){ // null이면 중복X
           return false;
       }else{
           return true;
       }
    }
    public List<User> findAll(){
        return userRepository.findAll();
    }
    @Transactional
    public void deleteUser(String userLoginId){
        Optional<User> deleteUser = Optional.ofNullable(userRepository.findByUserLoginId(userLoginId));
        if(deleteUser.isPresent()){
            userRepository.delete(deleteUser.get());
        }
    }
    @Transactional
    public void updateUser(String userLoginId, UserRequest request){
        Optional<User> findUser = Optional.ofNullable(userRepository.findByUserLoginId(userLoginId));
        if(findUser.isPresent()) {
            findUser.get().setUserPassword(request.getUserPassword());
            findUser.get().setUserPhone(request.getUserPhone());
            findUser.get().setUserAge(request.getUserAge());
            findUser.get().setUserNickname(request.getUserNickname());
        }
        else{
            throw new IllegalStateException("잘못된 유저 아이디입니다.");
        }
    }
    @Transactional
    public void updatePassword(ChangePasswordRequest request){
        Optional<User> findUser = Optional.ofNullable(userRepository.findByUserLoginId(request.getUserLoginId()));
        if(findUser.isPresent()){
            findUser.get().setUserPassword(request.getUserPassword());
        }
        else{
                throw new IllegalStateException("잘못된 유저 아이디입니다.");
        }
    }
    public User findByUserLoginIdAndUserPassword(String userLoginId, String userPassword){
        return userRepository.findByUserLoginIdAndUserPassword(userLoginId, userPassword);
    }
    @Transactional
    public void updateSkinType(String userLoginId, Skin skin){
        Optional<User> findUser = Optional.ofNullable(userRepository.findByUserLoginId(userLoginId));
        if(findUser.isPresent()){
            findUser.get().setSkinId(skin);
        }
    }
}
