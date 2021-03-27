package com.ssafy.sera.Domain.User;

import com.ssafy.sera.Controller.Request.UserRequest;
import com.ssafy.sera.Domain.Skin.Skin;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@ApiModel(value = "사용자 entity", description = "사용자에 대한 테이블과 1대1로 매핑이되는 데이터이다.")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String userLoginId;

    @Column(nullable = false)
    private String userPassword;

    private String userNickname;

    private int userAge;

    @Column(nullable = false)
    private String userPhone;

    private String userGender;

    @ManyToOne
    @JoinColumn(name = "skin_id")
    private Skin skinId;

    private String personalColor;

    public static User createUser(UserRequest userRequest, Skin skin){
        User userInput = new User();
        userInput.setUserLoginId(userRequest.getUserLoginId());
        userInput.setUserPassword(userRequest.getUserPassword());
        userInput.setUserNickname(userRequest.getUserNickname());
        userInput.setUserAge(userRequest.getUserAge());
        userInput.setUserPhone(userRequest.getUserPhone());
        userInput.setUserGender(userRequest.getUserGender());
        userInput.setSkinId(skin);
        return userInput;
    }
}
