package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.Skin.Skin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkinRepository extends JpaRepository<Skin, Long> {
    Skin findBySkinId(Long skinId);
    Skin findBySkinType(String skinType);
}
