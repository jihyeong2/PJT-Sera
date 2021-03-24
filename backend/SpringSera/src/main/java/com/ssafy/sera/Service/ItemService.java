package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.Dibs.Dibs;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.Item.ItemDto;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    /**
     * 상품 저장
     * @param item
     * @return
     */
    @Transactional
    public Item save(Item item){
        return itemRepository.save(item);
    }

    /**
     * 아이템 하나 가져오기
     * @param itemId
     * @return
     */
    public Item findByItemId(Long itemId){
        return itemRepository.findByItemId(itemId);
    }

    /**
     * 아이템 목록 싹 가져오기
     * @return
     */
    public List<Item> findAll(){
        return itemRepository.findAll();
    }

    /**
     * 아이템 항목 하나 삭제
     * @param itemId
     */
    public void deleteItem(Long itemId){
        Optional<Item> deleteItem = Optional.ofNullable(itemRepository.findByItemId(itemId));
        if(deleteItem.isPresent()){
            itemRepository.delete(deleteItem.get());
        }
    }

    /**
     * 검색이름으로 확인하기
     * @param itemName
     * @return
     */
    public List<Item> findByItemNameContaining(String itemName){
        return itemRepository.findByItemNameContaining(itemName);
    }

}
