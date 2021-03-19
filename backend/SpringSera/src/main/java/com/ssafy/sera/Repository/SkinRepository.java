package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.Skin.Skin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkinRepository extends JpaRepository<Skin, Long> {
    Skin save(String skinType);
    Skin findBySkinId(Long skinId);
    Skin findBySkinType(String skinType);
}
