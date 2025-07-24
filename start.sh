#!/bin/bash

echo "========================================"
echo "Developer Roadmaps 项目启动脚本"
echo "========================================"

echo ""
echo "正在启动 Spring Boot 后台服务..."
echo ""

cd backend
gnome-terminal --title="Spring Boot Backend" -- bash -c "mvn spring-boot:run; exec bash" &

echo "等待后台服务启动..."
sleep 10

echo ""
echo "正在启动 Next.js 前端服务..."
echo ""

cd ../frontend
gnome-terminal --title="Next.js Frontend" -- bash -c "npm run dev; exec bash" &

echo ""
echo "========================================"
echo "服务启动完成！"
echo "========================================"
echo ""
echo "前端地址: http://localhost:3000"
echo "后台地址: http://localhost:8080"
echo "H2 数据库: http://localhost:8080/api/h2-console"
echo ""
echo "测试账户:"
echo "- 普通用户: test@example.com / password123"
echo "- 管理员: admin@roadmap.com / admin123"
echo ""
read -p "按任意键继续..." 