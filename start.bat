@echo off
echo ========================================
echo Developer Roadmaps 项目启动脚本
echo ========================================

echo.
echo 正在启动 Spring Boot 后台服务...
echo.

cd backend
start "Spring Boot Backend" cmd /k "mvn spring-boot:run"

echo 等待后台服务启动...
timeout /t 10 /nobreak > nul

echo.
echo 正在启动 Next.js 前端服务...
echo.

cd ..\frontend
start "Next.js Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo 服务启动完成！
echo ========================================
echo.
echo 前端地址: http://localhost:3000
echo 后台地址: http://localhost:8080
echo H2 数据库: http://localhost:8080/api/h2-console
echo.
echo 测试账户:
echo - 普通用户: test@example.com / password123
echo - 管理员: admin@roadmap.com / admin123
echo.
pause 