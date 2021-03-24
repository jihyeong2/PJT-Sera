package com.ssafy.sera.Domain.Item;

import com.ssafy.sera.Controller.Request.ItemRequest;
import com.ssafy.sera.Controller.Request.UserRequest;
import com.ssafy.sera.Domain.Dibs.Dibs;
import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.User.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;
    @Column
    private String itemName;
    @Column(columnDefinition = "text")
    private String itemImg;
    @Column
    private String itemBrand;
//    카테고리 추가 후 타입 및 연관 관계 수정할 것
    @Column
    private Long categoryId;

    @Column(columnDefinition = "text")
    private String itemColors;
    @Column
    private  String itemVolume;
    @Column(columnDefinition = "text")
    private String itemDescription;
//    테그 작성 후 타입 및 연관 관계 수정할 것
//    @Column
//    private String itemTags;
//    테그 작성 후 타입 및 연관 관계 수정할 것
    @Column(columnDefinition = "INT DEFAULT 0")
    private int dibsCnt;

    public static Item createItem(ItemRequest itemRequest){
        Item itemInput = new Item();
        itemInput.setItemName(itemRequest.getItemName());
        itemInput.setItemImg(itemRequest.getItemImg());
        itemInput.setItemBrand(itemRequest.getItemBrand());
        itemInput.setItemColors(itemRequest.getItemColors());
        itemInput.setItemVolume(itemRequest.getItemVolume());
        itemInput.setItemDescription(itemRequest.getItemDescription());
        return itemInput;
    }

    public int pushDibs(){
        this.dibsCnt += 1;
        return this.dibsCnt;
    }
    public int pullDibs(){
        this.dibsCnt -= 1;
        return this.dibsCnt;
    }
}
