package com.roadmap.controller;

import com.roadmap.dto.AuthResponse;
import com.roadmap.dto.LoginRequest;
import com.roadmap.dto.SignupRequest;
import com.roadmap.entity.User;
import com.roadmap.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            AuthResponse response = userService.authenticateUser(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
            );
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest signupRequest) {
        try {
            User user = new User();
            user.setName(signupRequest.getName());
            user.setEmail(signupRequest.getEmail());
            user.setPassword(signupRequest.getPassword());
            
            AuthResponse response = userService.registerUser(user);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            // 移除 "Bearer " 前缀
            String jwt = token.substring(7);
            
            // 从 token 中提取用户信息
            String email = userService.getJwtService().extractUsername(jwt);
            User user = userService.findByEmail(email).orElse(null);
            
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            
            AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getAvatar()
            );
            
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "无效的 token");
            return ResponseEntity.badRequest().body(error);
        }
    }
} 