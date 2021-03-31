package com.ssafy.sera.Controller;

import com.ssafy.sera.Controller.Request.ReviewRequest;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Domain.review.ReviewDto;
import com.ssafy.sera.Service.ItemService;
import com.ssafy.sera.Service.ReviewService;
import com.ssafy.sera.Util.Validator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ItemService itemService;
    private final Validator validator;

    @ApiOperation(value = "리뷰 작성", notes = "리뷰 작성 성공시 BaseResponse에 data값으로 '성공적으로 작성' 설정 후 반환", response = BaseResponse.class)
    @PostMapping("/write")
    public BaseResponse reviewWrite(@ApiParam(value = "리뷰 객체 객체") @RequestBody ReviewRequest request){
        BaseResponse response = null;
        try{
            Review review = Review.createReview(request, request.getUser(), request.getItem());
            reviewService.save(review);
            response = new BaseResponse("success", "성공적으로 작성");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail",e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "현재 상품에 작성된 전체 리뷰목록 불러오기", notes = "List 형식으로 반환", response = BaseResponse.class)
    @GetMapping("/list/{itemId}")
    public BaseResponse findAllReview(@ApiParam(value = "상품 아이디")@PathVariable Long itemId){
        BaseResponse response = null;
        try{
            Item item = itemService.findByItemId(itemId);
            List<ReviewDto> reviewList  = reviewService.findByItem(item);
            response = new BaseResponse("success", reviewList);
        }
        catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
}
