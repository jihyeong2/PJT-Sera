package com.ssafy.sera.Service;

import com.ssafy.sera.Domain.Category.Category;
import com.ssafy.sera.Repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    @Transactional
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> findAllByCategoryLarge(String categoryLarge){
        return categoryRepository.findAllByCategoryLarge(categoryLarge);
    }

    public List<Category> findAllByCategoryMiddle(String categoryMiddle){
        return categoryRepository.findAllByCategoryMiddle(categoryMiddle);
    }
    public Category findByCategoryId(Long categoryId){
        return categoryRepository.findByCategoryId(categoryId);
    }
}
