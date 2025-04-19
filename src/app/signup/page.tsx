"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { SignupCredentials } from "@/types/auth";

export default function Signup() {
  const { signup, isLoading } = useAuth();
  const [credentials, setCredentials] = useState<SignupCredentials>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password match if confirm password field is changing
    if (name === "password") {
      setPasswordMatchError(
        confirmPassword !== "" && confirmPassword !== value
      );
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatchError(value !== credentials.password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (credentials.password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      await signup(credentials);
    } catch (error) {
      setErrorMessage("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md w-full my-8">
        {/* Glassmorphism card */}
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <Link href="/">
              <h2 className="text-2xl font-bold text-blue-600">Healthaware</h2>
            </Link>
            <h1 className="text-3xl font-bold mt-4 mb-2">Create Account</h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Sign up to get started with mental health assessment
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            {errorMessage && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={credentials.name}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass-sm"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={credentials.email}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass-sm"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg glass-sm"
                placeholder="••••••••"
                minLength={8}
              />
              <p className="text-xs text-neutral-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full p-3 rounded-lg glass-sm ${
                  passwordMatchError
                    ? "border-red-500 focus:border-red-500"
                    : ""
                }`}
                placeholder="••••••••"
              />
              {passwordMatchError && (
                <p className="text-xs text-red-500 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading || passwordMatchError}
                className="w-full rounded-lg py-3 px-4 text-center font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-70 shadow-lg backdrop-blur-sm"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
