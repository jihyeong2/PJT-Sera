package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.Dibs.Dibs;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DibsRepository extends JpaRepository<Dibs, Long> {
    Dibs findByUserIdAndItemId(User userId, Item itemId);
    List<Dibs> findAllByUserId(User userId);
}
