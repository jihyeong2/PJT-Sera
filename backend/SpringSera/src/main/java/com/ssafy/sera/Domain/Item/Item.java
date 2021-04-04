package com.ssafy.sera.Domain.Item;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.sera.Controller.Request.ItemRequest;
import com.ssafy.sera.Controller.Request.UserRequest;
import com.ssafy.sera.Domain.Category.Category;
import com.ssafy.sera.Domain.Dibs.Dibs;
import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category categoryId;

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

    @JsonBackReference
    @OneToMany(mappedBy="item")
    private List<Review> reviewList = new ArrayList<Review>();

    public static Item createItem(ItemRequest itemRequest){
        Item itemInput = new Item();
        itemInput.setItemId(itemRequest.getItemId());
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
