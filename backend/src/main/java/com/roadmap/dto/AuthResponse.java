package com.roadmap.dto;

public class AuthResponse {
    
    private String token;
    private boolean isNewUser;
    private UserInfo user;
    
    // Constructors
    public AuthResponse() {}
    
    public AuthResponse(String token, boolean isNewUser, UserInfo user) {
        this.token = token;
        this.isNewUser = isNewUser;
        this.user = user;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public boolean isNewUser() {
        return isNewUser;
    }
    
    public void setNewUser(boolean newUser) {
        isNewUser = newUser;
    }
    
    public UserInfo getUser() {
        return user;
    }
    
    public void setUser(UserInfo user) {
        this.user = user;
    }
    
    // Inner class for user info
    public static class UserInfo {
        private Long id;
        private String name;
        private String email;
        private String avatar;
        
        // Constructors
        public UserInfo() {}
        
        public UserInfo(Long id, String name, String email, String avatar) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.avatar = avatar;
        }
        
        // Getters and Setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public String getAvatar() {
            return avatar;
        }
        
        public void setAvatar(String avatar) {
            this.avatar = avatar;
        }
    }
} 