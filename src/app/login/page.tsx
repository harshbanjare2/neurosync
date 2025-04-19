"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { LoginCredentials } from "@/types/auth";

export default function Login() {
  const { login, isLoading } = useAuth();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await login(credentials);
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md w-full">
        {/* Neumorphic card */}
        <div className="neu-flat dark:neu-flat-dark rounded-neu p-8 md:p-10">
          <div className="text-center mb-8">
            <Link href="/">
              <h2 className="text-2xl font-bold text-blue-600">Healthaware</h2>
            </Link>
            <h1 className="text-3xl font-bold mt-4 mb-2">Welcome Back</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMessage && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email Address
              </label>
              <div className="neu-pressed dark:neu-pressed-dark rounded-lg">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={credentials.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-transparent border-none focus:ring-0"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="neu-pressed dark:neu-pressed-dark rounded-lg">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-transparent border-none focus:ring-0"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full skeu-btn dark:skeu-btn-dark rounded-lg py-3 px-4 text-center font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
