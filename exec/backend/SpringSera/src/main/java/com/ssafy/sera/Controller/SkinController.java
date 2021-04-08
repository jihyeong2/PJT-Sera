package com.ssafy.sera.Controller;

import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.Skin.SkinDto;
import com.ssafy.sera.Service.SkinService;
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
@RequestMapping("/v1/skins")
@RequiredArgsConstructor
public class SkinController {
    private final SkinService skinService;
    @ApiOperation(value = "피부타입 추가", notes = "개발단 테스트 용", response = BaseResponse.class)
    @PostMapping("/addSkin/{skinType}")
    public BaseResponse addSkinType(@ApiParam(value = "스킨타입") @PathVariable String skinType){
        BaseResponse response = null;
        try{
            Skin skin = Skin.createSkin(skinType);
            skinService.save(skin);
            response = new BaseResponse("success", "성공");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @ApiOperation(value = "피부타입 목록 불러오기", notes = "개발단 테스트 용", response = BaseResponse.class)
    @GetMapping
    public BaseResponse findSkins(){
        BaseResponse response = null;
        try{
            List<Skin> findSkins = skinService.findSkinList();
            List<SkinDto> collect = findSkins.stream()
                    .map(m-> new SkinDto(m))
                    .collect(Collectors.toList());
            response = new BaseResponse("success", collect);
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @ApiOperation(value = "피부타입명으로 Skin 객체 찾아오기", notes = "개발단 테스트 용", response = BaseResponse.class)
    @GetMapping("/{skinType}")
    public BaseResponse findBySkinType(@ApiParam(value = "스킨아이디")@PathVariable String skinType){
        BaseResponse response = null;
        try {
            Skin skin = skinService.findBySkinType(skinType);
            response = new BaseResponse("success", skin);
        }catch(Exception e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @ApiOperation(value = "피부타입 삭제", notes = "개발단 테스트 용", response = BaseResponse.class)
    @DeleteMapping("/{skinType}")
    public BaseResponse deleteSkinId(@ApiParam(value ="스킨타입")@PathVariable String skinType){
        BaseResponse response = null;
        try{
            skinService.deleteSkin(skinType);
            response = new BaseResponse("success", "삭제");
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
}
