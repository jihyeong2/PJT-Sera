package com.ssafy.sera.Controller;

import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.Skin.SkinDto;
import com.ssafy.sera.Service.SkinService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.pool.TypePool;
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
    @PostMapping("/addSkin")
    public BaseResponse addSkinType(@ApiParam(value = "스킨타입") @RequestParam String skintype){
        BaseResponse response = null;
        try{
            skinService.save(skintype);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @GetMapping
    public BaseResponse findSkins(){
        BaseResponse response = null;
        try{
            List<Skin> findSkins = skinService.findSkinList();
            List<SkinDto> collect = findSkins.stream()
                    .map(m-> new SkinDto(m))
                    .collect(Collectors.toList());
            response = new BaseResponse("success", collect);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @GetMapping("/{skinId}")
    public BaseResponse findSkinId(@ApiParam(value = "스킨아이디")@PathVariable Long skinId){
        BaseResponse response = null;
        try {
            skinService.findBySkinId(skinId);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
    @DeleteMapping("/{skinType}")
    public BaseResponse deleteSkinId(@ApiParam(value ="스킨타입")@PathVariable String skinType){
        BaseResponse response = null;
        try{
            skinService.deleteSkin(skinType);
        }catch(IllegalStateException e){
            response = new BaseResponse("fail", e.getMessage());
        }
        return response;
    }
}
