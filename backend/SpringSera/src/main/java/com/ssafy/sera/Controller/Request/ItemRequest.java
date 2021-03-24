package com.ssafy.sera.Controller.Request;

import lombok.Data;

@Data
public class ItemRequest {
    private Long itemId;
    private String itemName;
    private String itemImg;
    private String itemBrand;
    private String itemColors;
    private String itemVolume;
    private String itemDescription;
    // 추후 수정할 예정
    private Long categoryId;
}
