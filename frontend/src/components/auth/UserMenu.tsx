"use client";

import { useState } from "react";
import { getUser, removeAuthToken } from "@/lib/auth";

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const user = getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <a
          href="/login"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          登录
        </a>
        <a
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          注册
        </a>
      </div>
    );
  }

  const handleLogout = () => {
    removeAuthToken();
    window.location.href = "/";
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span>{user.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-500">{user.email}</div>
          </div>

          <a
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            个人资料
          </a>

          <a
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            设置
          </a>

          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
