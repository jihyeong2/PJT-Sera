package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    User save(User user);
    @Override
    Optional<User> findById(Long userId);
    List<User> findAll();
}
