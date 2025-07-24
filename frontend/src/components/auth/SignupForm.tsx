"use client";

import { useState, FormEvent } from "react";
import { httpPost } from "@/lib/http";
import { setAuthToken, FIRST_LOGIN_PARAM } from "@/lib/auth";

type SignupFormProps = {
  isDisabled?: boolean;
  setIsDisabled?: (isDisabled: boolean) => void;
};

export function SignupForm({ isDisabled, setIsDisabled }: SignupFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsDisabled?.(true);
    setError("");

    if (password !== confirmPassword) {
      setError("密码不匹配");
      setIsLoading(false);
      setIsDisabled?.(false);
      return;
    }

    const { response, error } = await httpPost<{
      token: string;
      isNewUser: boolean;
    }>("http://localhost:8080/api/auth/signup", {
      name,
      email,
      password,
    });

    // 注册成功，设置 token 并重定向
    if (response?.token) {
      setAuthToken(response.token);

      const currentLocation = window.location.href;
      const url = new URL(currentLocation, window.location.origin);

      url.searchParams.set(FIRST_LOGIN_PARAM, response?.isNewUser ? "1" : "0");

      window.location.href = url.toString();
      return;
    }

    setIsLoading(false);
    setIsDisabled?.(false);
    setError(error?.message || "注册失败，请重试。");
  };

  return (
    <form className="w-full" onSubmit={handleFormSubmit}>
      <label htmlFor="name" className="sr-only">
        姓名
      </label>
      <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        required
        className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        placeholder="姓名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="email" className="sr-only">
        邮箱地址
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        placeholder="邮箱地址"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password" className="sr-only">
        密码
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="confirmPassword" className="sr-only">
        确认密码
      </label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        placeholder="确认密码"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && (
        <p className="mt-2 mb-3 rounded-md bg-red-100 p-2 text-red-800 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading || isDisabled}
        className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:bg-gray-400 hover:bg-blue-700"
      >
        {isLoading ? "注册中..." : "注册"}
      </button>
    </form>
  );
}
