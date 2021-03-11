package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.lang.reflect.Member;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {
    @Autowired
    UserService userService;

    @Test
    @Transactional
    void save() {
        User userTest = new User();
        userTest.setUserEmail("test입니다.");
        userTest.setUserPassword("테스트 비밀번호입니다");
        userTest.setUserPhone("폰번호입니다");
        userService.save(userTest);
        System.out.println(userService.findById(1L));
        List<User> userList = userService.findAll();
        for(int i = 0 ; i < userList.size();i++){
            System.out.println(userList.get(i).getUserId());
            System.out.println(userList.get(i).getUserEmail());
            System.out.println(userList.get(i).getUserPhone());
            System.out.println(userList.get(i).getUserPassword());
        }
    }
}