package com.ssafy.sera.Controller;

import com.ssafy.sera.Controller.Request.ReviewRequest;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Domain.review.ReviewDto;
import com.ssafy.sera.Service.ItemService;
import com.ssafy.sera.Service.ReviewService;
import com.ssafy.sera.Service.UserService;
import com.ssafy.sera.Util.Validator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ItemService itemService;
    private final UserService userService;
    private final Validator validator;

    @ApiOperation(value = "리뷰 작성", notes = "리뷰 작성 성공시 BaseResponse에 data값으로 '성공적으로 작성' 설정 후 반환", response = BaseResponse.class)
    @PostMapping
    public BaseResponse writeReview(@ApiParam(value = "리뷰 객체") @RequestBody ReviewRequest request){
        BaseResponse response = null;
        try{
            Review review = Review.createReview(request);
            User user = userService.findByUserLoginId(request.getUserLoginId());
            Item item = itemService.findByItemId(request.getItemId());
            review.setUser(user);
            review.setItem(item);
            reviewService.save(review);
            response = new BaseResponse("success", "성공적으로 작성");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail",e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "현재 상품에 작성된 전체 리뷰목록 조회", notes = "List 형식으로 반환", response = BaseResponse.class)
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

    @ApiOperation(value = "현재 리뷰 상세정보 조회", notes = "ReviewDto 형식으로 반환", response = BaseResponse.class)
    @PostMapping("/detail/{reviewId}")
    public BaseResponse detailReview(@ApiParam(value = "리뷰 아이디")@PathVariable Long reviewId){
        BaseResponse response = null;
        try{
            Review review = reviewService.findByReviewId(reviewId);
            ReviewDto reviewDto = new ReviewDto(review);
            response = new BaseResponse("success", reviewDto);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail",e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "리뷰 수정", notes = "반환되는 데이터는 수정 성공 / 에러 메시지", response = BaseResponse.class)
    @PutMapping
    public BaseResponse updateReview(@ApiParam(value = "리뷰 객체") @RequestBody ReviewRequest request) {
        System.out.println("===================="+request.getReviewGoodContent());
        BaseResponse response = null;
        try {
            reviewService.updateReview(request);
            response = new BaseResponse("success", "수정 성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "리뷰 삭제", notes = "반환되는 데이터는 삭제 성공 / 에러 메시지", response = BaseResponse.class)
    @DeleteMapping("/{reviewId}")
    public BaseResponse deleteUser(@ApiParam(value = "리뷰 아이디")@PathVariable Long reviewId){
        BaseResponse response = null;
        try {
            reviewService.deleteReview(reviewId);
            response = new BaseResponse("success", "삭제 성공");
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }



}
