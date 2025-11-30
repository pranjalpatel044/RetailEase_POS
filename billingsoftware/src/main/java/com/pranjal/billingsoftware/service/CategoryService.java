package com.pranjal.billingsoftware.service;

import com.pranjal.billingsoftware.io.CategoryRequest;
import com.pranjal.billingsoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file);

    List<CategoryResponse> read();

    void delete( String categoryId);
}
