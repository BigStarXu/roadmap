package com.roadmap.config;

import com.roadmap.entity.User;
import com.roadmap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // 检查是否已有测试用户
        if (userRepository.findByEmail("test@example.com").isEmpty()) {
            User testUser = new User();
            testUser.setName("测试用户");
            testUser.setEmail("test@example.com");
            testUser.setPassword(passwordEncoder.encode("password123"));
            testUser.setRole(User.Role.USER);
            
            userRepository.save(testUser);
            System.out.println("✅ 测试用户已创建: test@example.com / password123");
        }
        
        // 检查是否已有管理员用户
        if (userRepository.findByEmail("admin@roadmap.com").isEmpty()) {
            User adminUser = new User();
            adminUser.setName("管理员");
            adminUser.setEmail("admin@roadmap.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setRole(User.Role.ADMIN);
            
            userRepository.save(adminUser);
            System.out.println("✅ 管理员用户已创建: admin@roadmap.com / admin123");
        }
    }
} 