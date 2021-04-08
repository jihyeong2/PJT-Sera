package com.ssafy.sera.Domain.Dibs;

import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Dibs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long DibsId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item itemId;

    public Dibs (User user, Item item){
        this.userId = user;
        this.itemId = item;
    }
}

