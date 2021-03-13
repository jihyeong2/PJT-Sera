package com.ssafy.sera.Domain;

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
public class UserDto {
    private Long userId;
    private String userLoginId;
    private String userPassword;
    private String userName;
    private int userAge;
    private String userPhone;
    private String userGender;

    public UserDto(User user){
        this.userId = user.getUserId();
        this.userLoginId = user.getUserLoginId();
        this.userPassword = user.getUserPassword();
        this.userName = user.getUserName();
        this.userAge = user.getUserAge();
        this.userPhone = user.getUserPhone();
        this.userGender = user.getUserGender();
    }


}
