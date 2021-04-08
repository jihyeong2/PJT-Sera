package com.ssafy.sera.Domain.Skin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkinDto {
    private Long skinId;
    private String skinType;

    public SkinDto(Skin skin){
        this.skinId = skin.getSkinId();
        this.skinType = skin.getSkinType();
    }
}
