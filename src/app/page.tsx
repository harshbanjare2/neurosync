"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 flex justify-between items-center glass-sm">
        <div className="flex items-center gap-2">
          <div className="text-blue-600 font-bold text-2xl">Healthaware</div>
        </div>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 rounded-full text-blue-600 hover:bg-blue-50 transition-all neu-flat"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 rounded-full bg-blue-600 text-black hover:bg-blue-700 transition-all shadow-md hover:shadow-lg skeu-btn"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="max-w-4xl w-full">
          <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Your Mental Health Matters
              </h1>
              <p className="text-lg text-gray-800 mb-6">
                Get personalized mental health assessments with AI-powered
                insights to help you understand your well-being better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="px-6 py-3 rounded-full bg-blue-600  font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg text-center skeu-btn"
                >
                  Get Started
                </Link>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 rounded-full bg-white text-blue-600 font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md border border-gray-200 text-center neu-flat"
                >
                  Explore Dashboard
                </Link>
              </div>
            </div>
            <div className="w-full md:w-2/5 aspect-square relative">
              <div className="w-full h-full rounded-2xl neu-flat flex items-center justify-center p-6">
                {/* Placeholder for illustration */}
                <div className="w-4/5 h-4/5 rounded-full neu-pressed flex items-center justify-center">
                  <div className="text-5xl text-blue-500">🧠</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI-Powered Analysis",
                description:
                  "Get insights from advanced AI algorithms trained on mental health data",
                icon: "🤖",
              },
              {
                title: "Private & Secure",
                description:
                  "Your data is encrypted and never shared with third parties",
                icon: "🔒",
              },
              {
                title: "Actionable Insights",
                description:
                  "Receive personalized recommendations to improve your well-being",
                icon: "💡",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass-sm rounded-xl p-6 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-800">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 glass-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-700 text-sm">
            © {new Date().getFullYear()} Healthaware. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-gray-700 hover:text-blue-600 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-700 hover:text-blue-600 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-blue-600 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
