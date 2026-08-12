import { useState } from "react";

import UserLayout from "../layouts/UserLayout";

import {
  Settings as SettingsIcon,
  Palette,
  Globe,
  Bell,
  Shield,
  User,
  Moon,
  Sun,
  Check,
  Lock,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { changePassword } from "../services/userService";

import toast from "react-hot-toast";


function Settings() {

  // =====================================================
  // USER
  // =====================================================

  const storedUser =
    JSON.parse(
      localStorage.getItem("user") || "null"
    );

  const userId = storedUser?.id;

  const temporaryPassword =
    storedUser?.temporaryPassword === true;


  // =====================================================
  // THEME
  // =====================================================

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );


  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const [notifications, setNotifications] =
    useState(
      localStorage.getItem("notifications") !== "false"
    );


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [changingPassword, setChangingPassword] =
    useState(false);


  // =====================================================
  // THEME
  // =====================================================

  const handleThemeChange = (selectedTheme) => {

    setTheme(selectedTheme);

    localStorage.setItem(
      "theme",
      selectedTheme
    );

    if (selectedTheme === "dark") {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );
    }
  };


  // =====================================================
  // NOTIFICATIONS
  // =====================================================

  const handleNotifications = () => {

    const newValue = !notifications;

    setNotifications(newValue);

    localStorage.setItem(
      "notifications",
      newValue
    );
  };


  // =====================================================
  // CHANGE PASSWORD
  // =====================================================

  const handleChangePassword = async (e) => {

    e.preventDefault();


    // ---------------------------------------------------
    // CHECK USER
    // ---------------------------------------------------

    if (!userId) {

      toast.error(
        "User session not found. Please login again."
      );

      return;
    }


    // ---------------------------------------------------
    // VALIDATE CURRENT PASSWORD
    // ---------------------------------------------------

    if (!currentPassword.trim()) {

      toast.error(
        "Please enter your current password."
      );

      return;
    }


    // ---------------------------------------------------
    // VALIDATE NEW PASSWORD
    // ---------------------------------------------------

    if (!newPassword.trim()) {

      toast.error(
        "Please enter a new password."
      );

      return;
    }


    if (newPassword.length < 8) {

      toast.error(
        "New password must be at least 8 characters."
      );

      return;
    }


    // ---------------------------------------------------
    // CONFIRM PASSWORD
    // ---------------------------------------------------

    if (newPassword !== confirmPassword) {

      toast.error(
        "New password and confirm password do not match."
      );

      return;
    }


    try {

      setChangingPassword(true);


      const response =
        await changePassword(
          userId,
          {
            currentPassword,
            newPassword,
          }
        );


      toast.success(
        response.data?.message ||
        "Password changed successfully!"
      );


      // -------------------------------------------------
      // UPDATE LOCAL USER
      // -------------------------------------------------

      const updatedUser = {
        ...storedUser,
        temporaryPassword: false,
      };


      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );


      // -------------------------------------------------
      // CLEAR FORM
      // -------------------------------------------------

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");


    } catch (error) {

      console.error(
        "Change Password Error:",
        error
      );


      const message =
        error.response?.data?.message ||
        "Unable to change password.";


      toast.error(message);

    } finally {

      setChangingPassword(false);
    }
  };


  // =====================================================
  // PASSWORD INPUT
  // =====================================================

  const PasswordInput = ({
    label,
    value,
    setValue,
    showPassword,
    setShowPassword,
    placeholder,
  }) => {

    return (
      <div>

        <label
          className="
            block
            text-sm
            font-semibold
            text-gray-700
            dark:text-gray-300
            mb-2
          "
        >
          {label}
        </label>

        <div className="relative">

          <Lock
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={value}
            onChange={(e) =>
              setValue(e.target.value)
            }
            placeholder={placeholder}
            className="
              w-full
              pl-10
              pr-12
              py-3
              rounded-xl
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-900
              text-gray-900
              dark:text-white
              placeholder-gray-400
              outline-none
              focus:ring-2
              focus:ring-green-500
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-gray-600
              dark:hover:text-gray-200
            "
          >

            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}

          </button>

        </div>

      </div>
    );
  };


  // =====================================================
  // RETURN
  // =====================================================

  return (

    <UserLayout>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div
            className="
              p-3
              bg-green-100
              dark:bg-green-900/40
              rounded-xl
            "
          >

            <SettingsIcon
              className="
                text-green-600
                dark:text-green-400
              "
              size={30}
            />

          </div>

          <div>

            <h1
              className="
                text-3xl
                font-bold
                text-gray-900
                dark:text-white
              "
            >
              Settings
            </h1>

            <p
              className="
                text-gray-500
                dark:text-gray-400
                mt-1
              "
            >
              Manage your preferences and account settings.
            </p>

          </div>

        </div>

      </div>


      {/* =================================================
          TEMPORARY PASSWORD WARNING
      ================================================= */}

      {temporaryPassword && (

        <div
          className="
            mb-6
            p-5
            rounded-2xl
            border
            border-yellow-300
            dark:border-yellow-700
            bg-yellow-50
            dark:bg-yellow-900/20
          "
        >

          <div className="flex items-start gap-3">

            <Shield
              size={24}
              className="
                text-yellow-600
                dark:text-yellow-400
                mt-0.5
              "
            />

            <div>

              <h3
                className="
                  font-bold
                  text-yellow-800
                  dark:text-yellow-300
                "
              >
                Temporary Password
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-yellow-700
                  dark:text-yellow-400
                "
              >
                You are currently using a temporary password.
                Please change your password below to secure your account.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          SETTINGS GRID
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >

        {/* =================================================
            APPEARANCE
        ================================================= */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <div
              className="
                p-3
                bg-green-100
                dark:bg-green-900/40
                rounded-xl
              "
            >

              <Palette
                className="
                  text-green-600
                  dark:text-green-400
                "
                size={22}
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Appearance
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Choose how Carbon Tracker looks.
              </p>

            </div>

          </div>


          <div className="grid grid-cols-2 gap-4">

            {/* LIGHT */}

            <button
              onClick={() =>
                handleThemeChange("light")
              }
              className={`
                relative
                p-5
                rounded-xl
                border-2
                transition
                ${
                  theme === "light"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }
              `}
            >

              {theme === "light" && (

                <div
                  className="
                    absolute
                    top-3
                    right-3
                  "
                >

                  <Check
                    size={18}
                    className="text-green-600"
                  />

                </div>

              )}

              <Sun
                size={28}
                className="
                  mx-auto
                  mb-3
                  text-yellow-500
                "
              />

              <p
                className="
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Light
              </p>

            </button>


            {/* DARK */}

            <button
              onClick={() =>
                handleThemeChange("dark")
              }
              className={`
                relative
                p-5
                rounded-xl
                border-2
                transition
                ${
                  theme === "dark"
                    ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }
              `}
            >

              {theme === "dark" && (

                <div
                  className="
                    absolute
                    top-3
                    right-3
                  "
                >

                  <Check
                    size={18}
                    className="text-green-400"
                  />

                </div>

              )}

              <Moon
                size={28}
                className="
                  mx-auto
                  mb-3
                  text-blue-500
                "
              />

              <p
                className="
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Dark
              </p>

            </button>

          </div>

        </div>


        {/* =================================================
            LANGUAGE
        ================================================= */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <div
              className="
                p-3
                bg-green-100
                dark:bg-green-900/40
                rounded-xl
              "
            >

              <Globe
                className="
                  text-green-600
                  dark:text-green-400
                "
                size={22}
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Language
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Choose your preferred language.
              </p>

            </div>

          </div>


          <select
            className="
              w-full
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-700
              text-gray-900
              dark:text-white
              rounded-xl
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-green-500
            "
            defaultValue="en"
          >

            <option value="en">
              🇺🇸 English
            </option>

            <option value="te">
              🇮🇳 తెలుగు
            </option>

            <option value="hi">
              🇮🇳 हिन्दी
            </option>

            <option value="ta">
              🇮🇳 தமிழ்
            </option>

            <option value="kn">
              🇮🇳 ಕನ್ನಡ
            </option>

            <option value="ml">
              🇮🇳 മലയാളം
            </option>

          </select>

        </div>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <div
              className="
                p-3
                bg-green-100
                dark:bg-green-900/40
                rounded-xl
              "
            >

              <Bell
                className="
                  text-green-600
                  dark:text-green-400
                "
                size={22}
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Notifications
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Manage your notification preferences.
              </p>

            </div>

          </div>


          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <div>

              <p
                className="
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Enable Notifications
              </p>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Receive updates and reminders.
              </p>

            </div>


            <button
              onClick={handleNotifications}
              className={`
                relative
                w-14
                h-7
                rounded-full
                transition
                ${
                  notifications
                    ? "bg-green-600"
                    : "bg-gray-300 dark:bg-gray-600"
                }
              `}
            >

              <span
                className={`
                  absolute
                  top-1
                  w-5
                  h-5
                  bg-white
                  rounded-full
                  transition
                  ${
                    notifications
                      ? "left-8"
                      : "left-1"
                  }
                `}
              />

            </button>

          </div>

        </div>


        {/* =================================================
            ACCOUNT
        ================================================= */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <div
              className="
                p-3
                bg-green-100
                dark:bg-green-900/40
                rounded-xl
              "
            >

              <User
                className="
                  text-green-600
                  dark:text-green-400
                "
                size={22}
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Account
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Manage your account information.
              </p>

            </div>

          </div>


          <div className="space-y-4">

            <button
              onClick={() =>
                window.location.href = "/profile"
              }
              className="
                w-full
                text-left
                p-4
                rounded-xl
                bg-gray-50
                dark:bg-gray-700
                hover:bg-gray-100
                dark:hover:bg-gray-600
                transition
              "
            >

              <p
                className="
                  font-semibold
                  text-gray-900
                  dark:text-white
                "
              >
                Profile
              </p>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                View and manage your profile.
              </p>

            </button>

          </div>

        </div>


        {/* =================================================
            SECURITY / CHANGE PASSWORD
        ================================================= */}

        <div
          className="
            lg:col-span-2
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-lg
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-6
            "
          >

            <div
              className="
                p-3
                bg-green-100
                dark:bg-green-900/40
                rounded-xl
              "
            >

              <Shield
                className="
                  text-green-600
                  dark:text-green-400
                "
                size={22}
              />

            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Security
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Change your password and secure your account.
              </p>

            </div>

          </div>


          <form
            onSubmit={handleChangePassword}
            className="
              max-w-2xl
              space-y-5
            "
          >

            <PasswordInput
              label="Current Password"
              value={currentPassword}
              setValue={setCurrentPassword}
              showPassword={showCurrentPassword}
              setShowPassword={setShowCurrentPassword}
              placeholder="Enter current password"
            />


            <PasswordInput
              label="New Password"
              value={newPassword}
              setValue={setNewPassword}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
              placeholder="Enter new password"
            />


            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              setValue={setConfirmPassword}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              placeholder="Confirm new password"
            />


            <div
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Password must contain at least 8 characters.
            </div>


            <button
              type="submit"
              disabled={changingPassword}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-xl
                bg-green-600
                text-white
                font-semibold
                hover:bg-green-700
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {changingPassword ? (

                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Changing Password...
                </>

              ) : (

                <>
                  <Lock size={18} />

                  Change Password
                </>

              )}

            </button>

          </form>

        </div>

      </div>

    </UserLayout>
  );
}


export default Settings;