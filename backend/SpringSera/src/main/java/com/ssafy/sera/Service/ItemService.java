package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.Category.Category;
import com.ssafy.sera.Domain.Dibs.Dibs;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.Item.ItemDto;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final CategoryService categoryService;
    private final DibsService dibsService;
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
    @Transactional
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

    public List<List> findAllByCategoryLarge(User user, String categoryLarge){
        List<List> returnList = new ArrayList<>();
        List<Dibs> findUsersDibs = dibsService.findAllByUserId(user);
        List<Item> findAllItem = itemRepository.findAll();
        List<ItemDto> skincare = new ArrayList<>();
        List<ItemDto> makeup = new ArrayList<>();
        List<ItemDto> perfume = new ArrayList<>();
        List<ItemDto> mans = new ArrayList<>();

        for (Item item : findAllItem){
            ItemDto input = new ItemDto(item);
            if(item.getCategoryId().getCategoryLarge().equals("메이크업")){
                for(Dibs dibs : findUsersDibs){
                    if(item.getItemId() == dibs.getItemId().getItemId()){
                        input.setDibsBoolean(true);
                    }
                }
                skincare.add(input);
            }else if(item.getCategoryId().getCategoryLarge().equals("스킨케어")){
                for(Dibs dibs : findUsersDibs){
                    if(item.getItemId() == dibs.getItemId().getItemId()){
                        input.setDibsBoolean(true);
                    }
                }
                makeup.add(input);
            }else if(item.getCategoryId().getCategoryLarge().equals("남성 화장품")){
                for(Dibs dibs : findUsersDibs){
                    if(item.getItemId() == dibs.getItemId().getItemId()){
                        input.setDibsBoolean(true);
                    }
                }
                perfume.add(input);
            }else if(item.getCategoryId().getCategoryLarge().equals("향수")){
                for(Dibs dibs : findUsersDibs){
                    if(item.getItemId() == dibs.getItemId().getItemId()){
                        input.setDibsBoolean(true);
                    }
                }
                mans.add(input);
            }
        }
        returnList.add(skincare);
        returnList.add(makeup);
        returnList.add(perfume);
        returnList.add(mans);
        return returnList;
    }
}
