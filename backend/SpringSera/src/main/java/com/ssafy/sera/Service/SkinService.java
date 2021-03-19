package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.Skin.Skin;
import com.ssafy.sera.Domain.User;
import com.ssafy.sera.Repository.SkinRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SkinService {
    private final SkinRepository skinRepository;

    /**
     * 스킨 값 저장하기
     * @param skin
     * @return
     */
    @Transactional
    public Skin save(Skin skin){
        return skinRepository.save(skin);
    }

    /**
     * 스킨리스트 다찾아오기
     * @return
     */
    public List<Skin> findSkinList(){
        return skinRepository.findAll();
    }

    /**
     * 스킨아이디로 가져오기
     * @param skinId
     * @return
     */
    public Skin findBySkinId(Long skinId){
        return skinRepository.findBySkinId(skinId);
    }

    /**
     * 스킨타입명으로 가져오기
     * @param skinType
     * @return
     */
    public Skin findBySkinType(String skinType){
        return skinRepository.findBySkinType(skinType);
    }
    /**
     * 스킨 삭제
     * @param skinType
     */
    @Transactional
    public void deleteSkin(String skinType){
        Optional<Skin> deleteSkin = Optional.ofNullable(skinRepository.findBySkinType(skinType));
        if(deleteSkin.isPresent()){
            skinRepository.delete(deleteSkin.get());
        }
    }
}
