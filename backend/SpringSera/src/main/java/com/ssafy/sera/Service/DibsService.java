package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.Dibs.Dibs;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Repository.DibsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DibsService {
    private final DibsRepository dibsRepository;

    public List<Dibs> findAll(){
        return dibsRepository.findAll();
    }

    public Dibs findByUserIdAndItemId(User user, Item item){
        return dibsRepository.findByUserIdAndItemId(user, item);
    }

    @Transactional
    public int pressDibs(User user, Item item){
        if(dibsRepository.findByUserIdAndItemId(user, item) == null){
            Dibs dibs = new Dibs(user, item);
            int dibsCount = item.pushDibs();
            dibsRepository.save(dibs);
            return dibsCount;
        }else{
            Dibs dibs = new Dibs(user, item);
            int dibsCount = item.pullDibs();
            dibsRepository.delete(dibs);
            return dibsCount;
        }
    }
}
