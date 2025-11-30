package com.pranjal.billingsoftware.service;

import com.pranjal.billingsoftware.io.UserRequest;
import com.pranjal.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

   UserResponse createUser(UserRequest userRequest);

   String getUserRole(String email);

   List<UserResponse> readUser();

   void deleteUser(String id);
}
