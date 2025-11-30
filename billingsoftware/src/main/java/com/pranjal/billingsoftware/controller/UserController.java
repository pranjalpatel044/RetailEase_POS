package com.pranjal.billingsoftware.controller;

import com.pranjal.billingsoftware.io.UserRequest;
import com.pranjal.billingsoftware.io.UserResponse;
import com.pranjal.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse registerUser(@RequestBody UserRequest request){
      try{
          return userService.createUser(request);
      } catch (Exception e) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Unable the create user "+e.getMessage());
      }
    }

    @GetMapping("/users")
    public List<UserResponse> readUser(){
        return userService.readUser();
    }

    @DeleteMapping("/users/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable String id){
        try{
            userService.deleteUser(id);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User Not found");
        }
    }
}
