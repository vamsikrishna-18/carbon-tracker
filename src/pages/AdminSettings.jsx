
import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import {
  Settings as SettingsIcon,
  Palette,
  Bell,
  Shield,
  User,
  Moon,
  Sun,
  Check,
} from "lucide-react";

import axios from "axios";

function AdminSettings() {
  // =====================================================
  // THEME
  // =====================================================

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [notifications, setNotifications] = useState(
    localStorage.getItem("notifications") !== "false"
  );

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // =====================================================
  // THEME CHANGE
  // =====================================================

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);

    localStorage.setItem("theme", selectedTheme);

    if (selectedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const handleNotifications = () => {
    const newValue = !notifications;

    setNotifications(newValue);

    localStorage.setItem("notifications", newValue);
  };

  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError(
        "New password and confirm password do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError(
        "New password must be different from current password."
      );
      return;
    }

    // -----------------------------------------------------
    // GET LOGGED-IN ADMIN ID
    // -----------------------------------------------------

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setPasswordError(
        "Admin session not found. Please login again."
      );
      return;
    }

    let user;

    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      setPasswordError(
        "Invalid admin session. Please login again."
      );
      return;
    }

    const adminId = user?.id;

    if (!adminId) {
      setPasswordError(
        "Admin ID not found. Please login again."
      );
      return;
    }

    // -----------------------------------------------------
    // API REQUEST
    // -----------------------------------------------------

    try {
      setPasswordLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/change-password/${adminId}`,
        {
          currentPassword,
          newPassword,
        }
      );

      setPasswordMessage(
        response.data?.message ||
          "Password changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (error) {
      console.error(
        "Admin Change Password Error:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Unable to change password.";

      setPasswordError(message);

    } finally {
      setPasswordLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <AdminLayout>

      <div className="w-full max-w-[1600px] mx-auto">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">

              <SettingsIcon
                className="text-green-600 dark:text-green-400"
                size={30}
              />

            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Admin Settings
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Manage your preferences and admin account settings.
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* SETTINGS GRID */}
        {/* ================================================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ================================================= */}
          {/* APPEARANCE */}
          {/* ================================================= */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">

                <Palette
                  className="text-green-600 dark:text-green-400"
                  size={22}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Appearance
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Choose how the admin panel looks.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              {/* LIGHT */}

              <button
                type="button"
                onClick={() =>
                  handleThemeChange("light")
                }
                className={`relative p-5 rounded-xl border-2 transition ${
                  theme === "light"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >

                {theme === "light" && (
                  <div className="absolute top-3 right-3">

                    <Check
                      size={18}
                      className="text-green-600"
                    />

                  </div>
                )}

                <Sun
                  size={28}
                  className="mx-auto mb-3 text-yellow-500"
                />

                <p className="font-semibold text-gray-900 dark:text-white">
                  Light
                </p>

              </button>

              {/* DARK */}

              <button
                type="button"
                onClick={() =>
                  handleThemeChange("dark")
                }
                className={`relative p-5 rounded-xl border-2 transition ${
                  theme === "dark"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >

                {theme === "dark" && (
                  <div className="absolute top-3 right-3">

                    <Check
                      size={18}
                      className="text-green-400"
                    />

                  </div>
                )}

                <Moon
                  size={28}
                  className="mx-auto mb-3 text-blue-500"
                />

                <p className="font-semibold text-gray-900 dark:text-white">
                  Dark
                </p>

              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* NOTIFICATIONS */}
          {/* ================================================= */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">

                <Bell
                  className="text-green-600 dark:text-green-400"
                  size={22}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Notifications
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your admin notification preferences.
                </p>

              </div>

            </div>

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-gray-900 dark:text-white">
                  Enable Notifications
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive updates and system notifications.
                </p>

              </div>

              <button
                type="button"
                onClick={handleNotifications}
                className={`relative w-14 h-7 rounded-full transition ${
                  notifications
                    ? "bg-green-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              >

                <span
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition ${
                    notifications
                      ? "left-8"
                      : "left-1"
                  }`}
                />

              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* ACCOUNT */}
          {/* ================================================= */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">

                <User
                  className="text-green-600 dark:text-green-400"
                  size={22}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Account
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your admin account.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={() =>
                (window.location.href = "/admin/profile")
              }
              className="w-full text-left p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >

              <p className="font-semibold text-gray-900 dark:text-white">
                Profile
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                View and manage your admin profile.
              </p>

            </button>

          </div>

          {/* ================================================= */}
          {/* CHANGE PASSWORD */}
          {/* ================================================= */}

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">

                <Shield
                  className="text-green-600 dark:text-green-400"
                  size={22}
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Security
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Change your admin account password.
                </p>

              </div>

            </div>

            {passwordMessage && (
              <div className="mb-4 p-3 rounded-xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
                {passwordMessage}
              </div>
            )}

            {passwordError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
                {passwordError}
              </div>
            )}

            <form
              onSubmit={handleChangePassword}
              className="space-y-4"
            >

              {/* CURRENT PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Current Password
                </label>

                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* NEW PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* CONFIRM PASSWORD */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition disabled:opacity-50"
              >
                {passwordLoading
                  ? "Changing Password..."
                  : "Change Password"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
}

export default AdminSettings;

