import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// 模拟用户数据库
const users = [
  {
    id: "1",
    name: "测试用户",
    email: "test@example.com",
    password: "password123", // 实际应用中应该使用加密密码
  },
];

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 验证输入
    if (!email || !password) {
      return NextResponse.json(
        { message: "邮箱和密码不能为空" },
        { status: 400 }
      );
    }

    // 查找用户
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json({ message: "邮箱或密码错误" }, { status: 401 });
    }

    // 生成 JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      JWT_SECRET,
      { expiresIn: "30d" }
    );

    return NextResponse.json({
      token,
      isNewUser: false,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "服务器错误" }, { status: 500 });
  }
}
