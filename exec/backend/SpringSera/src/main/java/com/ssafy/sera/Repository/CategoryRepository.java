package com.ssafy.sera.Repository;

import com.ssafy.sera.Domain.Category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAllByCategoryLarge(String categoryLarge);
    List<Category> findAllByCategoryMiddle(String categoryMiddle);
    Category findByCategoryId(Long categoryId);
}
