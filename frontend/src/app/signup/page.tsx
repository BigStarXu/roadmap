import { AuthenticationForm } from "@/components/auth/AuthenticationForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl px-8 py-10 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">注册</h1>
            <p className="text-base text-gray-600">
              创建您的账户，开始您的学习之旅。
            </p>
          </div>

          <AuthenticationForm type="signup" />

          <div className="mt-6 w-full rounded-md border py-3 text-center text-sm text-gray-600">
            已有账户？{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >
              登录
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
