package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

@SpringBootTest
class UserServiceTest {
    @Autowired
    UserService userService;


    @Test
    @Transactional
    void save() {
        User userTest = new User();
        userTest.setUserLoginId("test입니다.");
        userTest.setUserPassword("테스트 비밀번호입니다");
        userTest.setUserPhone("폰번호입니다");
        userService.save(userTest);
        List<User> userList = userService.findAll();
        Assertions.assertEquals(userList.size(),1);
        System.out.println(userList.get(0).getUserPassword());
    }
}