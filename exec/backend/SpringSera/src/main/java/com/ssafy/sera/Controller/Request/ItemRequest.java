package com.ssafy.sera.Controller.Request;

import io.swagger.annotations.ApiModel;
import lombok.Data;

@Data
@ApiModel(value = "아이템 객체 정보", description = "테스트용")
public class ItemRequest {
    private Long itemId;
    private String itemName;
    private String itemImg;
    private String itemBrand;
    private String itemColors;
    private String itemVolume;
    private String itemDescription;
    private Long categoryId;
}
