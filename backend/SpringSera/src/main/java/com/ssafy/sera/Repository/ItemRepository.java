package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.Item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByItemId(Long itemId);
}
