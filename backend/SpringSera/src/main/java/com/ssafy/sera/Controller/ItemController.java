package com.ssafy.sera.Controller;

import com.ssafy.sera.Controller.Request.DibsRequest;
import com.ssafy.sera.Controller.Request.ItemRequest;
import com.ssafy.sera.Controller.Request.SearchRequest;
import com.ssafy.sera.Domain.Category.Category;
import com.ssafy.sera.Domain.Dibs.Dibs;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.Item.ItemDto;
import com.ssafy.sera.Domain.User.User;
import com.ssafy.sera.Service.CategoryService;
import com.ssafy.sera.Service.DibsService;
import com.ssafy.sera.Service.ItemService;
import com.ssafy.sera.Service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Api
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;
    private final UserService userService;
    private final DibsService dibsService;
    private final CategoryService categoryService;
    @ApiOperation(value = "아이템 저장", notes = "개발 테스트용", response = BaseResponse.class)
    @PostMapping("/addItem")
    public BaseResponse itemRegister(@ApiParam(value = "아이템 객체")@RequestBody ItemRequest request){
        BaseResponse response = null;
        try{
            Item item = Item.createItem(request);
            Category category = categoryService.findByCategoryId(request.getCategoryId());
            item.setCategoryId(category);
            itemService.save(item);
            response = new BaseResponse("success", item);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    @ApiOperation(value = "아이템 목록 불러오기", notes = "개발 테스트용", response = BaseResponse.class)
    @GetMapping
    public BaseResponse findItems(){
     BaseResponse response = null;
     try{
         List<Item> findItems = itemService.findAll();
         List<ItemDto> collect = findItems.stream()
                 .map(m-> new ItemDto(m))
                 .collect(Collectors.toList());
         response = new BaseResponse("success", collect);
     }catch(Exception e){
         response = new BaseResponse("fail", e.getMessage());
     }
     return response;
    }

    @ApiOperation(value = "단일 아이템 불러오기", notes = "단일 아이템에 대한 정보가 들어감", response = BaseResponse.class)
    @GetMapping("/{itemId}")
    public BaseResponse itemDetail(@ApiParam(value = "아이템 아이디 값")@PathVariable Long itemId){
        BaseResponse response = null;
        try{
            Item item = itemService.findByItemId(itemId);
            ItemDto itemDto = new ItemDto(item);
            response = new BaseResponse("success", itemDto);
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @ApiOperation(value = "단일 아이템 삭제", notes = "개발 테스트용", response = BaseResponse.class)
    @DeleteMapping("/{itemId}")
    public BaseResponse deleteItem(@ApiParam(value = "아이템 아이디 값")@PathVariable Long itemId){
        BaseResponse response = null;
        try{
            itemService.deleteItem(itemId);
            response = new BaseResponse("success", "삭제 성공");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    /**
     * 검색하기(현재 진행 상황 - 아이템으로 이름가져오기)
     * @param request
     * @return
     */
    @ApiOperation(value = "상품 검색", notes = "카테고리 + 검색한 이름 / 성분(미완)으로 목록 불러오기", response = BaseResponse.class)
    @GetMapping("/search")
    public BaseResponse searchItem(@ApiParam(value = "검색을 위한 객체")@RequestBody SearchRequest request){
        BaseResponse response = null;
        try{
            List<Item> findItems = itemService.findByItemNameContaining(request.getSearchWord());
            User user = userService.findByUserLoginId(request.getUserLoginId());
            List<Dibs> findUsersDibs = dibsService.findAllByUserId(user);
            List<ItemDto> products = new ArrayList<>();
            for(Item item : findItems){
                if(item.getCategoryId().getCategoryLarge().equals(request.getCategoryLarge())){
                    ItemDto input = new ItemDto(item);
                    for(Dibs dibs : findUsersDibs){
                        if(item.getItemId() == dibs.getItemId().getItemId()){
                            input.setDibsBoolean(true);
                        }
                    }
                    products.add(input);
                }
            }
            List<List> returnList = new ArrayList<>();
            returnList.add(products);
            response = new BaseResponse("success", returnList);
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @ApiOperation(value = "상품 보기", notes = "카테고리 별로 상품 불러오기", response = BaseResponse.class)
    @GetMapping("/viewProduct/{userLoginId}")
    public BaseResponse viewProduct(@ApiParam(value = "사용자 로그인 아이디")@PathVariable String userLoginId){
        BaseResponse response = null;
        try{
            User user = userService.findByUserLoginId(userLoginId);
            List<List> returnList = itemService.findAllByCategoryLarge(user);
            response = new BaseResponse("success", returnList);
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    /**
     * dd
     * 찜하기
     * @param request
     * @return
     */
    @ApiOperation(value = "찜하기", notes = "상품에 대한 찜하기 기능", response = BaseResponse.class)
    @GetMapping("/dibs")
    public BaseResponse dibsItem(@ApiParam(value = "찜하기 객체")@RequestBody DibsRequest request){
        BaseResponse response = null;
        try{
            User user = userService.findByUserLoginId(request.getUserLoginId());
            Item item = itemService.findByItemId(request.itemId);
            int dibsCount = dibsService.pressDibs(user, item);
            response = new BaseResponse("success", dibsCount);
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @ApiOperation(value = "카테고리 추가", notes = "개발 테스트용", response = BaseResponse.class)
    @PostMapping("/category/{categoryLarge}/{categoryMiddle}/{categorySmall}")
    public BaseResponse categoryAdd(@PathVariable String categoryLarge,@PathVariable  String categoryMiddle,@PathVariable  String categorySmall){
        BaseResponse response = null;
        try{
            Category category = new Category();
            category.setCategoryLarge(categoryLarge);
            category.setCategoryMiddle(categoryMiddle);
            category.setCategorySmall(categorySmall);
            categoryService.save(category);
            response = new BaseResponse("success", category);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
}
