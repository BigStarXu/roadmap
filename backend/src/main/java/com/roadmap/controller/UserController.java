package com.roadmap.controller;

import com.roadmap.dto.AuthResponse;
import com.roadmap.entity.User;
import com.roadmap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
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
            error.put("message", "获取用户信息失败");
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @RequestBody Map<String, String> request
    ) {
        try {
            String email = authentication.getName();
            User user = userService.findByEmail(email).orElse(null);
            
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            
            // 更新用户信息
            if (request.containsKey("name")) {
                String newName = request.get("name");
                if (!newName.equals(user.getName()) && userService.existsByName(newName)) {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "该用户名已被使用");
                    return ResponseEntity.badRequest().body(error);
                }
                user.setName(newName);
            }
            
            if (request.containsKey("avatar")) {
                user.setAvatar(request.get("avatar"));
            }
            
            // 保存更新
            userService.saveUser(user);
            
            AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getAvatar()
            );
            
            return ResponseEntity.ok(userInfo);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "更新用户信息失败");
            return ResponseEntity.badRequest().body(error);
        }
    }
} 