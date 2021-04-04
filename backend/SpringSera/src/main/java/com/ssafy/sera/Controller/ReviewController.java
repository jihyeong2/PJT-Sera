package com.ssafy.sera.Controller;

import com.ssafy.sera.Controller.Request.DibsRequest;
import com.ssafy.sera.Controller.Request.GoodReviewRequest;
import com.ssafy.sera.Controller.Request.ReviewRequest;
import com.ssafy.sera.Domain.GoodReview.GoodReview;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.Item.ItemDto;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Domain.review.Review;
import com.ssafy.sera.Domain.review.ReviewDto;
import com.ssafy.sera.Service.*;
import com.ssafy.sera.Util.Validator;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Api
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ItemService itemService;
    private final UserService userService;
    private final S3Service s3Service;
    private final GoodReviewService grs;
    private final Validator validator;

    @ApiOperation(value = "리뷰 작성", notes = "리뷰 작성 성공시 BaseResponse에 data값으로 '성공적으로 작성' 설정 후 반환", response = BaseResponse.class)
    @PostMapping
    public BaseResponse writeReview(@ApiParam(value = "리뷰 객체", required=true) @RequestPart ReviewRequest request, @ApiParam(value = "사진 파일", required=false) @RequestPart(value = "file", required=true) MultipartFile file) throws IOException {
        BaseResponse response = null;

        try{
            Review review = Review.createReview(request);
            User user = userService.findByUserLoginId(request.getUserLoginId());
            Item item = itemService.findByItemId(request.getItemId());
            if(file!=null) {
                String review_img = s3Service.upload(file); //s3에 업로드
                review.setReviewImg(review_img);
            }
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
            List<Review> reviewList  = reviewService.findByItem(item);
            List<ReviewDto> collect = reviewList.stream()
                    .map(m-> new ReviewDto(m))
                    .collect(Collectors.toList());
            response = new BaseResponse("success", collect);
        }
        catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "현재 리뷰 상세정보 조회", notes = "ReviewDto 형식으로 반환", response = BaseResponse.class)
    @GetMapping("/detail/{reviewId}")
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


    @ApiOperation(value = "리뷰 도움 수 업데이트(클릭 이벤트)", notes = "도움 수 업데이트 성공시 도움수 반환 / 에러 메시지", response = BaseResponse.class)
    @PutMapping("/help/{request}")
    public BaseResponse modifyHelpCnt(@ApiParam(value = "도움 객체")@RequestBody GoodReviewRequest request){
        BaseResponse response = null;
        try {
            User user = userService.findByUserLoginId(request.getUserLoginId());
            Review review = reviewService.findByReviewId(request.getReviewId());
            long helpCnt = grs.pressHelp(user, review);
            response = new BaseResponse("success", helpCnt);
        } catch (IllegalStateException e) {
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

}
