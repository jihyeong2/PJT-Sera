package com.ssafy.sera.Domain.Skin;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Skin {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long skinId;
    private String skinType;

    public static Skin createSkin(String skinType){
        Skin skinInput = new Skin();
        skinInput.setSkinType(skinType);
        return skinInput;
    }
}
