package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.GoodReview.GoodReview;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Repository.GoodReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class GoodReviewService {

    private final GoodReviewRepository goodReviewRepository;


    @Transactional
    public int pressHelp(User user, Review review){
        if(goodReviewRepository.findByUserIdAndReviewId(user, review) == null){
            GoodReview goodReview = new GoodReview(user, review); //도움테이블에 내 아이디,리뷰번호 넣기
            int helpCnt = (int)review.pushCnt(); //리뷰테이블 도움수 업데이트
            goodReviewRepository.save(goodReview);
            return helpCnt;
        }else{
            GoodReview goodReview = goodReviewRepository.findByUserIdAndReviewId(user, review);
            int helpCnt = (int)review.pullCnt();
            goodReviewRepository.delete(goodReview);
            return helpCnt;
        }
    }
}
