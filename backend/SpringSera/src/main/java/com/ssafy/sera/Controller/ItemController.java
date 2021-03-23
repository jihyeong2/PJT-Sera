package com.ssafy.sera.Controller;

import com.ssafy.sera.Controller.Request.ItemRequest;
import com.ssafy.sera.Domain.Item.Item;
import com.ssafy.sera.Domain.Item.ItemDto;
import com.ssafy.sera.Service.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Api
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/items")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @ApiOperation(value = "아이템 저장", notes = "개발 테스트용", response = BaseResponse.class)
    @PostMapping("/addItem")
    public BaseResponse itemRegister(@RequestBody ItemRequest request){
        BaseResponse response = null;
        try{
            System.out.println(request.getItemImg() + " " + request.getItemColors() + " " + request.getItemDescription());
            Item item = Item.createItem(request);
            System.out.println(item.getItemImg() + " " + item.getItemColors() + " " + item.getItemDescription());
            itemService.save(item);
            response = new BaseResponse("success", item);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }

    // 사용자 아이디값 필요 - user의 찜 목록을 확인할 수 있도록
    @ApiOperation(value = "아이템 목록 불러오기", notes = "목록은 List의 형태로 반환", response = BaseResponse.class)
    @GetMapping
    public BaseResponse findItems(){
     BaseResponse response = null;
     try{
         List<Item> findItems = itemService.findAll();
         List<ItemDto> collect = findItems.stream()
                 .map(m-> new ItemDto(m))
                 .collect(Collectors.toList());
         response = new BaseResponse("success", collect);
     }catch(IllegalStateException e){
         response = new BaseResponse("fail", e.getMessage());
     }
     return response;
    }

    @ApiOperation(value = "단일 아이템 불러오기", notes = "단일 아이템에 대한 정보가 들어감", response = BaseResponse.class)
    @GetMapping("/{itemId}")
    public BaseResponse itemDetail(@PathVariable Long itemId){
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
    @DeleteMapping("/{itemId}")
    public BaseResponse deleteItem(@PathVariable Long itemId){
        BaseResponse response = null;
        try{
            itemService.deleteItem(itemId);
            response = new BaseResponse("success", "삭제 성공");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
}
