# Developer Roadmaps Frontend

这是一个模仿 roadmap.sh 的用户登录系统的前端项目，使用 Next.js 和 TypeScript 构建。

## 功能特性

- 🔐 用户登录和注册
- 🎨 现代化的 UI 设计
- 📱 响应式布局
- 🔒 JWT 认证
- 👤 用户菜单和状态管理
- 🚀 基于 Next.js 14 和 React 18

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── auth/          # 认证相关 API
│   ├── login/             # 登录页面
│   ├── signup/            # 注册页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   └── auth/              # 认证相关组件
│       ├── AuthenticationForm.tsx
│       ├── LoginForm.tsx
│       ├── SignupForm.tsx
│       └── UserMenu.tsx
├── lib/                   # 工具函数
│   ├── auth.ts           # 认证工具
│   └── http.ts           # HTTP 请求工具
└── types/                # TypeScript 类型定义
```

## 认证系统

### 登录测试账户

- 邮箱: `test@example.com`
- 密码: `password123`

### 功能说明

1. **登录页面** (`/login`): 用户可以使用邮箱和密码登录
2. **注册页面** (`/signup`): 新用户可以创建账户
3. **用户菜单**: 登录后显示用户信息和登出选项
4. **JWT 认证**: 使用 JWT token 进行身份验证
5. **状态管理**: 自动检测登录状态并更新 UI

### API 端点

- `POST /api/auth/login` - 用户登录
- `POST /api/auth/signup` - 用户注册

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **认证**: JWT + Cookies
- **状态管理**: React Hooks
- **HTTP 客户端**: Fetch API

## 开发说明

### 环境变量

创建 `.env.local` 文件并添加：

```env
JWT_SECRET=your-secret-key-here
```

### 构建生产版本

```bash
npm run build
npm start
```

## 特性对比

这个项目模仿了 roadmap.sh 的以下特性：

- ✅ 用户登录/注册界面
- ✅ JWT 认证系统
- ✅ 用户菜单和状态显示
- ✅ 响应式设计
- ✅ 现代化的 UI 组件
- ✅ 错误处理和用户反馈

## 下一步改进

- [ ] 添加社交登录（GitHub、Google）
- [ ] 实现密码重置功能
- [ ] 添加用户个人资料页面
- [ ] 集成真实数据库
- [ ] 添加邮箱验证
- [ ] 实现记住登录状态
- [ ] 添加多语言支持

## 许可证

MIT License
