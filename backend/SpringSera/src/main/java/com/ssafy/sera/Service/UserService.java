package com.ssafy.sera.Service;

import com.ssafy.sera.Controller.UserRequest;
import com.ssafy.sera.Domain.User;
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
            findUser.get().setUserName(request.getUserName());
        }
    }

    public User findByUserLoginIdAndUserPassword(String userLoginId, String userPassword){
        return userRepository.findByUserLoginIdAndUserPassword(userLoginId, userPassword);
    }
}
