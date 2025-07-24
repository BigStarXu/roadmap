import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { UserMenu } from "@/components/auth/UserMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developer Roadmaps",
  description: "社区创建的学习路线图、指南和文章，帮助开发者在职业生涯中成长。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {/* 导航栏 */}
        <nav className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="text-white text-xl font-bold">
                  Developer Roadmaps
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <Link
                  href="/roadmaps"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  路线图
                </Link>
                <Link
                  href="/guides"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  指南
                </Link>
                <Link
                  href="/questions"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  问答
                </Link>
                <UserMenu />
              </div>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
