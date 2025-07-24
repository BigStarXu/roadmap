package com.roadmap.service;

import com.roadmap.dto.AuthResponse;
import com.roadmap.entity.User;
import com.roadmap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("用户不存在: " + email));
    }
    
    public AuthResponse registerUser(User user) {
        // 检查邮箱是否已存在
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("该邮箱已被注册");
        }
        
        // 检查用户名是否已存在
        if (userRepository.existsByName(user.getName())) {
            throw new RuntimeException("该用户名已被使用");
        }
        
        // 加密密码
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // 保存用户
        User savedUser = userRepository.save(user);
        
        // 生成 JWT token
        String token = jwtService.generateToken(savedUser);
        
        // 创建响应
        AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getAvatar()
        );
        
        return new AuthResponse(token, true, userInfo);
    }
    
    public AuthResponse authenticateUser(String email, String password) {
        // 查找用户
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("邮箱或密码错误");
        }
        
        User user = userOpt.get();
        
        // 验证密码
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("邮箱或密码错误");
        }
        
        // 生成 JWT token
        String token = jwtService.generateToken(user);
        
        // 创建响应
        AuthResponse.UserInfo userInfo = new AuthResponse.UserInfo(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getAvatar()
        );
        
        return new AuthResponse(token, false, userInfo);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    public boolean existsByName(String name) {
        return userRepository.existsByName(name);
    }
    
    public User saveUser(User user) {
        return userRepository.save(user);
    }
    
    public JwtService getJwtService() {
        return jwtService;
    }
} 