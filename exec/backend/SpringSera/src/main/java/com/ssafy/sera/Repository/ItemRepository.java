package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.Item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    Item findByItemId(Long itemId);
    List<Item> findByItemNameContaining(String itemName);
}
