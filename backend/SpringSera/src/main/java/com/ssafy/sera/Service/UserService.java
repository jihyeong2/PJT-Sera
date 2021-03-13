package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.User;
import com.ssafy.sera.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public User save(User user){
        return userRepository.save(user);
    }
    public Optional<User> findById(Long userId){
        return userRepository.findById(userId);
    }
    public List<User> findAll(){
        return userRepository.findAll();
    }
}
