# Developer Roadmaps Backend

这是一个基于 Spring Boot + Java 的后台服务，为 Developer Roadmaps 前端提供 API 支持。

## 🚀 技术栈

- **框架**: Spring Boot 3.2.0
- **语言**: Java 17
- **数据库**: H2 (内存数据库，可替换为 MySQL/PostgreSQL)
- **安全**: Spring Security + JWT
- **ORM**: Spring Data JPA
- **构建工具**: Maven

## 📋 功能特性

- 🔐 JWT 认证系统
- 👤 用户注册/登录
- 🔒 密码加密 (BCrypt)
- 📊 用户信息管理
- 🛡️ 基于角色的权限控制
- 🌐 CORS 支持
- 📝 数据验证

## 🏗️ 项目结构

```
src/main/java/com/roadmap/
├── RoadmapBackendApplication.java    # 主应用类
├── config/                          # 配置类
│   ├── SecurityConfig.java          # 安全配置
│   ├── ApplicationConfig.java       # 应用配置
│   └── DataInitializer.java         # 数据初始化
├── controller/                      # 控制器
│   ├── AuthController.java          # 认证控制器
│   └── UserController.java          # 用户控制器
├── service/                         # 服务层
│   ├── UserService.java             # 用户服务
│   ├── JwtService.java              # JWT 服务
│   └── JwtAuthenticationFilter.java # JWT 过滤器
├── repository/                      # 数据访问层
│   └── UserRepository.java          # 用户仓库
├── entity/                          # 实体类
│   └── User.java                    # 用户实体
└── dto/                             # 数据传输对象
    ├── LoginRequest.java            # 登录请求
    ├── SignupRequest.java           # 注册请求
    └── AuthResponse.java            # 认证响应
```

## 🚀 快速开始

### 环境要求

- Java 17+
- Maven 3.6+

### 启动应用

```bash
# 克隆项目
cd roadmap/backend

# 编译项目
mvn clean compile

# 运行应用
mvn spring-boot:run
```

应用将在 `http://localhost:8080` 启动。

### 数据库访问

- **H2 控制台**: `http://localhost:8080/api/h2-console`
- **JDBC URL**: `jdbc:h2:mem:roadmapdb`
- **用户名**: `sa`
- **密码**: `password`

## 📡 API 端点

### 认证相关

#### 用户登录

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

#### 用户注册

```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "新用户",
  "email": "newuser@example.com",
  "password": "password123"
}
```

#### 获取当前用户信息

```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

### 用户管理

#### 获取用户资料

```http
GET /api/users/profile
Authorization: Bearer <jwt_token>
```

#### 更新用户资料

```http
PUT /api/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "新姓名",
  "avatar": "https://example.com/avatar.jpg"
}
```

## 🔑 测试账户

应用启动时会自动创建以下测试账户：

### 普通用户

- **邮箱**: `test@example.com`
- **密码**: `password123`

### 管理员用户

- **邮箱**: `admin@roadmap.com`
- **密码**: `admin123`

## 🔧 配置说明

### 应用配置 (`application.yml`)

```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  datasource:
    url: jdbc:h2:mem:roadmapdb
    username: sa
    password: password

  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true

jwt:
  secret: your-secret-key-here
  expiration: 86400000 # 24小时
```

### 生产环境配置

1. **更换数据库**: 将 H2 替换为 MySQL 或 PostgreSQL
2. **修改 JWT 密钥**: 使用强密钥替换默认密钥
3. **配置 CORS**: 限制允许的域名
4. **启用 HTTPS**: 配置 SSL 证书

## 🛠️ 开发指南

### 添加新的 API 端点

1. 在 `controller` 包中创建新的控制器
2. 在 `service` 包中创建对应的服务类
3. 在 `entity` 包中创建实体类（如需要）
4. 在 `repository` 包中创建数据访问接口

### 数据库迁移

当前使用 H2 内存数据库，生产环境建议：

1. **MySQL**:

   ```xml
   <dependency>
       <groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
   </dependency>
   ```

2. **PostgreSQL**:
   ```xml
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
   </dependency>
   ```

### 部署

#### Docker 部署

```dockerfile
FROM openjdk:17-jdk-slim
COPY target/roadmap-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### 传统部署

```bash
mvn clean package
java -jar target/roadmap-backend-0.0.1-SNAPSHOT.jar
```

## 🔒 安全特性

- **JWT 认证**: 无状态认证机制
- **密码加密**: BCrypt 加密存储
- **CORS 配置**: 跨域请求支持
- **输入验证**: 请求参数验证
- **角色权限**: 基于角色的访问控制

## 📝 日志

应用使用 Spring Boot 默认日志配置，可通过 `application.yml` 调整日志级别：

```yaml
logging:
  level:
    com.roadmap: DEBUG
    org.springframework.security: DEBUG
```

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## �� 许可证

MIT License
