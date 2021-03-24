package com.ssafy.sera.Domain.Item;

import com.ssafy.sera.Domain.Category.CategoryDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDto {
    private Long itemId;
    private String itemName;
    private String itemImg;
    private String itemBrand;
    private CategoryDto categoryDto;
    private String itemColors;
    private  String itemVolume;
    private String itemDescription;
    private String itemTags;
    private int dibsCnt;
    private boolean dibsBoolean;
    public ItemDto(Item item){
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.itemImg = item.getItemImg();
        this.itemBrand = item.getItemBrand();
        if(item.getItemColors() != null){
            this.itemColors = item.getItemColors();
        }
        this.itemVolume = item.getItemVolume();
        this.itemDescription = item.getItemDescription();
        if(item.getCategoryId() != null){
            categoryDto = new CategoryDto();
            this.categoryDto.setCategoryId(item.getCategoryId().getCategoryId());
            this.categoryDto.setCategoryLarge(item.getCategoryId().getCategoryLarge());
            this.categoryDto.setCategoryMiddle(item.getCategoryId().getCategoryMiddle());
            this.categoryDto.setCategorySmall(item.getCategoryId().getCategorySmall());
        }
        if(item.getItemTags() != null){
            this.itemTags = item.getItemTags();
        }
        this.dibsCnt = item.getDibsCnt();
    }
    public void setDibsBoolean(boolean flag){
        this.dibsBoolean = flag;
    }
}
