package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
}
