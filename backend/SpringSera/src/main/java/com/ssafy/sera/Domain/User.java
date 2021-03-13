package com.ssafy.sera.Domain;

import com.ssafy.sera.Controller.UserRequest;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String userPassword;

    private int userAge;

    @Column(nullable = false)
    private String userPhone;

    private String userGender;

    public static User createUser(UserRequest userRequest){
        User userInput = new User();
        userInput.setUserEmail(userRequest.getUserEmail());
        userInput.setUserPassword(userRequest.getUserPassword());
        userInput.setUserAge(userRequest.getUserAge());
        userInput.setUserPhone(userRequest.getUserPhone());
        userInput.setUserGender(userRequest.getUserGender());
        return userInput;
    }
}
