# Developer Roadmaps 项目

这是一个完整的全栈项目，包含前端和后端服务，模仿 roadmap.sh 的用户登录系统。

## 🏗️ 项目架构

```
roadmap/
├── frontend/          # Next.js 前端应用
│   ├── src/
│   │   ├── app/       # Next.js App Router
│   │   ├── components/ # React 组件
│   │   └── lib/       # 工具函数
│   └── package.json
├── backend/           # Spring Boot 后台服务
│   ├── src/main/java/
│   │   └── com/roadmap/
│   │       ├── controller/ # REST API 控制器
│   │       ├── service/    # 业务逻辑层
│   │       ├── entity/     # 数据实体
│   │       └── config/     # 配置类
│   └── pom.xml
├── start.bat          # Windows 启动脚本
├── start.sh           # Linux/Mac 启动脚本
└── README.md
```

## 🚀 快速开始

### 环境要求

- **Java 17+**
- **Node.js 18+**
- **Maven 3.6+**

### 一键启动

#### Windows

```bash
# 双击运行或命令行执行
start.bat
```

#### Linux/Mac

```bash
# 给脚本执行权限
chmod +x start.sh

# 运行脚本
./start.sh
```

### 手动启动

#### 1. 启动后台服务

```bash
cd backend
mvn spring-boot:run
```

#### 2. 启动前端服务

```bash
cd frontend
npm install
npm run dev
```

## 🌐 访问地址

- **前端应用**: http://localhost:3000
- **后台 API**: http://localhost:8080
- **H2 数据库控制台**: http://localhost:8080/api/h2-console

## 🔑 测试账户

应用启动时会自动创建以下测试账户：

### 普通用户

- **邮箱**: `test@example.com`
- **密码**: `password123`

### 管理员用户

- **邮箱**: `admin@roadmap.com`
- **密码**: `admin123`

## 📡 API 端点

### 认证相关

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/signup` - 用户注册
- `GET /api/auth/me` - 获取当前用户信息

### 用户管理

- `GET /api/users/profile` - 获取用户资料
- `PUT /api/users/profile` - 更新用户资料

## 🛠️ 技术栈

### 前端

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: React Hooks
- **HTTP 客户端**: Fetch API

### 后台

- **框架**: Spring Boot 3.2.0
- **语言**: Java 17
- **数据库**: H2 (可替换为 MySQL/PostgreSQL)
- **安全**: Spring Security + JWT
- **ORM**: Spring Data JPA

## 🔧 开发指南

### 前端开发

```bash
cd frontend
npm install
npm run dev
```

### 后台开发

```bash
cd backend
mvn clean compile
mvn spring-boot:run
```

### 数据库管理

- 访问 H2 控制台: http://localhost:8080/api/h2-console
- JDBC URL: `jdbc:h2:mem:roadmapdb`
- 用户名: `sa`
- 密码: `password`

## 📦 部署

### 前端部署

```bash
cd frontend
npm run build
npm start
```

### 后台部署

```bash
cd backend
mvn clean package
java -jar target/roadmap-backend-0.0.1-SNAPSHOT.jar
```

### Docker 部署

```bash
# 构建后台镜像
cd backend
docker build -t roadmap-backend .

# 运行后台容器
docker run -p 8080:8080 roadmap-backend
```

## 🔒 安全特性

- **JWT 认证**: 无状态认证机制
- **密码加密**: BCrypt 加密存储
- **CORS 配置**: 跨域请求支持
- **输入验证**: 请求参数验证
- **角色权限**: 基于角色的访问控制

## 📝 功能特性

- ✅ 用户注册/登录
- ✅ JWT 认证
- ✅ 用户资料管理
- ✅ 响应式设计
- ✅ 现代化 UI
- ✅ 错误处理
- ✅ 数据验证

## 🚧 待开发功能

- [ ] 社交登录 (GitHub, Google)
- [ ] 密码重置
- [ ] 邮箱验证
- [ ] 用户头像上传
- [ ] 记住登录状态
- [ ] 多语言支持
- [ ] 用户权限管理
- [ ] 操作日志

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

如有问题或建议，请提交 Issue 或 Pull Request。
