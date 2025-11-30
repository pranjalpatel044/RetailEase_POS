package com.pranjal.billingsoftware.service.impl;

import com.pranjal.billingsoftware.entity.UserEntity;
import com.pranjal.billingsoftware.io.UserRequest;
import com.pranjal.billingsoftware.io.UserResponse;
import com.pranjal.billingsoftware.repository.UserRepository;
import com.pranjal.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest request) {
        UserEntity newUser = convertToEntity(request);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    private UserResponse convertToResponse(UserEntity user) {
        return UserResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .userId(user.getUserId())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
    private UserEntity convertToEntity(UserRequest request){
        return  UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole().toUpperCase())
                .name(request.getName())
                .build();
    }

    @Override
    public String getUserRole(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(("User not found for the email: "+email)));
        return existingUser.getRole();
    }

    @Override
    public List<UserResponse> readUser() {
        return userRepository.findAll()
                .stream()
                .map(user -> convertToResponse(user))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
       UserEntity existingUser = userRepository.findByUserId(id)
               .orElseThrow(() -> new UsernameNotFoundException("User not found"));
       userRepository.delete((existingUser));
    }
}
