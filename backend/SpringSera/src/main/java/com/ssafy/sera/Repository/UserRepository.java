package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.User.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserLoginId(String userLoginId);
    User findByUserNickname(String userNickname);
    User findByUserLoginIdAndUserPassword(String userLoginId, String userPassword);
}
