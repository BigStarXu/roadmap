import { NextRequest, NextResponse } from "next/server";

// 模拟用户数据库（实际应用中应该使用真实数据库）
const users = [
  {
    id: "1",
    name: "测试用户",
    email: "test@example.com",
    password: "password123",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // 验证输入
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "姓名、邮箱和密码不能为空" },
        { status: 400 }
      );
    }

    // 检查邮箱是否已存在
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ message: "该邮箱已被注册" }, { status: 409 });
    }

    // 创建新用户
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password, // 实际应用中应该加密密码
    };

    users.push(newUser);

    // 生成简单的 token（实际应用中应该使用 JWT）
    const token = btoa(
      JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      })
    );

    return NextResponse.json({
      token,
      isNewUser: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "服务器错误" }, { status: 500 });
  }
}
