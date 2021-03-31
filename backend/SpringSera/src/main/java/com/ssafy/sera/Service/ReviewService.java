package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Domain.review.ReviewDto;
import com.ssafy.sera.Repository.ReviewRepository;
import com.ssafy.sera.Util.Validator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final Validator validator;

    /**
     * 리뷰 등록하기
     * @return
     */
    @Transactional
    public Review save(Review review){
        return reviewRepository.save(review);
    }

    /**
     * 현재 아이템의 전체 리뷰 목록 가져오기
     * @return
     */
    public List<ReviewDto> findByItem(Item item) {
        return reviewRepository.findByItem(item);
    }
}
