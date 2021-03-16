package com.ssafy.sera.Domain;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "사용자 Dto", description = "반환시 User 객체를 넣을 경우 매핑된 데이터는 줄줄이 딸려오기 때문에 따로 만들어 줌")
public class UserDto {
    private Long userId;
    private String userLoginId;
    private String userPassword;
    private String userNickname;
    private int userAge;
    private String userPhone;
    private String userGender;

    public UserDto(User user){
        this.userId = user.getUserId();
        this.userLoginId = user.getUserLoginId();
        this.userPassword = user.getUserPassword();
        this.userNickname = user.getUserNickname();
        this.userAge = user.getUserAge();
        this.userPhone = user.getUserPhone();
        this.userGender = user.getUserGender();
    }


}
