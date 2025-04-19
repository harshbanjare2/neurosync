"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    notifications: true,
    darkMode: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the user's profile
    console.log("Saving profile data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Your Profile</h1>
        <p className="text-gray-800 mt-1">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
              <p className="text-gray-700">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 neu-flat rounded-lg text-blue-600 hover:text-blue-700"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="neu-pressed rounded-lg w-full p-3"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="neu-pressed rounded-lg w-full p-3"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preferences</h3>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-700">
                    Receive updates about your assessments
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    className="sr-only peer"
                    checked={formData.notifications}
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Dark Mode</div>
                  <div className="text-sm text-gray-700">
                    Toggle between light and dark theme
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="darkMode"
                    className="sr-only peer"
                    checked={formData.darkMode}
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="skeu-btn px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="neu-flat rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-700 mb-1">Name</div>
                  <div className="font-medium">
                    {user?.name || "Not provided"}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-700 mb-1">Email</div>
                  <div className="font-medium">{user?.email}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-700 mb-1">Member Since</div>
                <div className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="skeu-inset rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-medium">Assessment Summary</h3>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-700">Total Assessments</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-700">Monthly Average</div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-blue-600">-</div>
                  <div className="text-sm text-gray-700">Last Assessment</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
