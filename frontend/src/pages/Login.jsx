import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  BarChart3,
  Trophy,
  Globe2,
  ArrowRight,
  Moon,
  Sun,
} from "lucide-react";

import axios from "axios";
import "./login.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const navigate = useNavigate();

  // ============================================================
  // STATE
  // ============================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // ============================================================
  // THEME
  // ============================================================

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // ============================================================
  // NORMAL LOGIN
  // USER + ADMIN USE THE SAME LOGIN
  // ============================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    // ----------------------------------------------------------
    // Validation
    // ----------------------------------------------------------

    const cleanEmail = email.trim();

    if (!cleanEmail || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      console.log("========== LOGIN ==========");
      console.log("EMAIL:", cleanEmail);
      console.log("ENDPOINT:", `${API_BASE_URL}/auth/login`);

      // --------------------------------------------------------
      // ONE LOGIN ENDPOINT FOR BOTH USER AND ADMIN
      // --------------------------------------------------------

      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        {
          email: cleanEmail,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("LOGIN RESPONSE:", response.data);

      // --------------------------------------------------------
      // GET USER FROM RESPONSE
      // --------------------------------------------------------

      const loggedInUser = response.data?.user;

      if (!loggedInUser) {
        throw new Error(
          "Login successful but user information was not returned."
        );
      }

      console.log("LOGGED IN USER:", loggedInUser);
      console.log("USER ROLE:", loggedInUser.role);

      // --------------------------------------------------------
      // CLEAR OLD LOGIN DATA
      // --------------------------------------------------------

      localStorage.removeItem("user");
      localStorage.removeItem("admin");

      // --------------------------------------------------------
      // ADMIN
      // --------------------------------------------------------

      if (loggedInUser.role === "ADMIN") {
        console.log("ADMIN LOGIN SUCCESS");

        localStorage.setItem(
          "admin",
          JSON.stringify(loggedInUser)
        );

        // Optional: also store generic logged-in user
        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        navigate("/admin/dashboard", {
          replace: true,
        });

        return;
      }

      // --------------------------------------------------------
      // NORMAL USER
      // --------------------------------------------------------

      if (loggedInUser.role === "USER") {
        console.log("USER LOGIN SUCCESS");

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        navigate("/dashboard", {
          replace: true,
        });

        return;
      }
      if (loggedInUser.role === "ORGANIZATION") {
        console.log("ORGANIZATION LOGIN SUCCESS");

        localStorage.setItem(
          "organization",
          JSON.stringify(loggedInUser)
        );

        localStorage.setItem(
          "user",
          JSON.stringify(loggedInUser)
        );

        navigate("/organization/dashboard", {
          replace: true,
        });

        return;
      }

      // --------------------------------------------------------
      // UNKNOWN ROLE
      // --------------------------------------------------------

      console.error(
        "Unknown user role:",
        loggedInUser.role
      );

      alert(
        "Login successful, but the account role is invalid."
      );

    } catch (error) {
      // --------------------------------------------------------
      // ERROR HANDLING
      // --------------------------------------------------------

      console.error("LOGIN ERROR:", error);

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      let message = "Invalid email or password";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (
        typeof error.response?.data === "string"
      ) {
        message = error.response.data;
      } else if (
        error.message ===
        "Network Error"
      ) {
        message =
          "Unable to connect to the server. Please make sure the backend is running.";
      } else if (error.response?.status === 404) {
        message = "Login service was not found.";
      } else if (error.response?.status === 401) {
        message = "Invalid email or password.";
      } else if (error.response?.status === 403) {
        message =
          "You are not allowed to login with this account.";
      } else if (error.response?.status >= 500) {
        message =
          "Server error. Please try again later.";
      }

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // GOOGLE LOGIN
  // ============================================================

  const handleGoogleLogin = () => {
    console.log("Starting Google Login...");

    // Use standard Spring Security OAuth2 authorization endpoint
    const baseUrl = API_BASE_URL.replace('/api', '');
    window.location.href =
      `${baseUrl}/oauth2/authorization/google`;
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        min-h-[100dvh]
        w-full
        flex
        flex-col
        lg:flex-row
        bg-gray-50
        dark:bg-gray-950
        transition-colors
        duration-300
      "
    >

      {/* ======================================================
          MOBILE / TABLET BRAND BAR (hidden on lg+)
      ====================================================== */}

      <div
        className="
          lg:hidden
          relative
          overflow-hidden
          bg-gradient-to-br
          from-green-700
          to-green-900
          dark:from-gray-900
          dark:to-black
          px-5
          py-5
          sm:px-8
          sm:py-6
          flex
          items-center
          justify-between
          gap-3
        "
      >
        {/* decorative pattern */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-[0.08] pointer-events-none"
          viewBox="0 0 400 120"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="30" cy="20" r="60" fill="white" />
          <circle cx="370" cy="100" r="70" fill="white" />
        </svg>

        <div className="relative flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl bg-white/15 flex items-center justify-center">
            <Leaf size={22} className="text-green-200" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-black text-lg sm:text-xl leading-tight truncate">
              Carbon Tracker
            </p>
            <p className="text-green-200 text-xs sm:text-sm truncate">
              Build a greener future 🌱
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle Theme"
          className="
            relative
            flex-shrink-0
            w-10
            h-10
            rounded-full
            bg-white/15
            text-white
            flex
            items-center
            justify-center
            active:scale-95
            transition
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-white
          "
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>


      {/* ======================================================
          LEFT SECTION (desktop only)
      ====================================================== */}

      <div
        className="
          hidden
          lg:flex
          lg:w-1/2
          relative
          overflow-hidden
          bg-gradient-to-br
          from-green-700
          to-green-900
          dark:from-gray-900
          dark:to-black
          text-white
          px-10
          xl:px-16
          py-16
          flex-col
          justify-center
        "
      >

        {/* decorative pattern (signature element) */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-[0.06] pointer-events-none"
          viewBox="0 0 600 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="60" cy="80" r="140" fill="white" />
          <circle cx="560" cy="260" r="200" fill="white" />
          <circle cx="120" cy="680" r="160" fill="white" />
          <circle cx="520" cy="740" r="90" fill="white" />
        </svg>

        <div className="relative">
          <Leaf size={64} className="text-green-300 xl:w-[70px] xl:h-[70px]" />

          <h1 className="text-4xl xl:text-5xl font-black mt-8 leading-tight">
            Carbon Tracker
          </h1>

          <h2 className="text-2xl xl:text-3xl font-bold mt-4">
            Build a Greener Future 🌱
          </h2>

          <p className="mt-6 text-base xl:text-lg text-green-100 max-w-xl">
            A smart sustainability platform that helps you
            monitor your carbon footprint, analyze your
            environmental impact and build eco-friendly habits.
          </p>

          <div className="mt-10 space-y-5">

            {/* Track */}

            <div className="flex items-center gap-4">

              <div className="bg-white/15 p-3 rounded-xl flex-shrink-0">
                <BarChart3 />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Track Your Impact
                </h3>

                <p className="text-green-100 text-sm">
                  Monitor your daily carbon emissions.
                </p>
              </div>

            </div>

            {/* Rewards */}

            <div className="flex items-center gap-4">

              <div className="bg-white/15 p-3 rounded-xl flex-shrink-0">
                <Trophy />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Earn Rewards
                </h3>

                <p className="text-green-100 text-sm">
                  Complete eco-friendly activities and goals.
                </p>
              </div>

            </div>

            {/* Protect */}

            <div className="flex items-center gap-4">

              <div className="bg-white/15 p-3 rounded-xl flex-shrink-0">
                <Globe2 />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Protect Tomorrow
                </h3>

                <p className="text-green-100 text-sm">
                  Make sustainable choices every day.
                </p>
              </div>

            </div>

          </div>

          <p className="mt-12 italic text-green-100 text-base xl:text-lg">
            "Small actions today create a sustainable future 🌱"
          </p>
        </div>

      </div>


      {/* ======================================================
          RIGHT SECTION
      ====================================================== */}

      <div
        className="
          w-full
          lg:w-1/2
          flex-1
          flex
          items-center
          justify-center
          px-4
          py-8
          sm:px-6
          sm:py-10
          lg:p-10
          relative
        "
      >

        {/* ====================================================
            THEME BUTTON (desktop only — mobile has its own in the brand bar)
        ==================================================== */}

        <button
          type="button"
          onClick={toggleTheme}
          className="
            hidden
            lg:flex
            absolute
            top-6
            right-6
            p-3
            rounded-full
            bg-white
            dark:bg-gray-800
            border
            border-gray-200
            dark:border-gray-700
            text-gray-700
            dark:text-gray-200
            shadow
            hover:scale-105
            transition
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-green-500
          "
          title="Toggle Theme"
        >

          {darkMode ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}

        </button>


        <div className="w-full max-w-md pb-[env(safe-area-inset-bottom)]">

          {/* ==================================================
              LOGO / TITLE (hidden on mobile — brand bar covers it)
          ================================================== */}

          <div className="hidden lg:block text-center mb-8">

            <div
              className="
                inline-flex
                p-4
                rounded-2xl
                bg-green-100
                dark:bg-green-900/40
                text-green-600
                dark:text-green-400
              "
            >
              <Leaf size={42} />
            </div>

            <h1
              className="
                text-4xl
                font-black
                mt-5
                text-gray-900
                dark:text-white
              "
            >
              Welcome Back
            </h1>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Login to continue your green journey
            </p>

          </div>

          {/* Mobile-only compact title */}
          <div className="lg:hidden text-center mb-6 mt-1">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Login to continue your green journey
            </p>
          </div>


          {/* ==================================================
              LOGIN CARD
          ================================================== */}

          <div
            className="
              bg-white
              dark:bg-gray-800
              rounded-2xl
              sm:rounded-3xl
              shadow-xl
              sm:shadow-2xl
              p-5
              sm:p-8
              border
              border-gray-200
              dark:border-gray-700
            "
          >

            <form
              onSubmit={handleLogin}
              className="space-y-5"
              noValidate
            >

              {/* ============================================
                  EMAIL
              ============================================ */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    mb-2
                    text-sm
                    sm:text-base
                    font-semibold
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Email Address
                </label>

                <div className="relative flex items-center">

                  <Mail
                    size={20}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      pointer-events-none
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    autoComplete="email"
                    disabled={loading}
                    className="
                      w-full
                      pl-12
                      pr-4
                      py-3
                      sm:py-3.5
                      min-h-[48px]
                      rounded-xl
                      border
                      border-gray-300
                      dark:border-gray-600
                      bg-white
                      dark:bg-gray-900
                      text-gray-900
                      dark:text-white
                      text-base
                      outline-none
                      focus:ring-2
                      focus:ring-green-500
                      focus:border-transparent
                      disabled:opacity-60
                      transition
                    "
                  />

                </div>

              </div>


              {/* ============================================
                  PASSWORD
              ============================================ */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    block
                    mb-2
                    text-sm
                    sm:text-base
                    font-semibold
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Password
                </label>

                <div className="relative flex items-center">

                  <Lock
                    size={20}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      pointer-events-none
                    "
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    autoComplete="current-password"
                    disabled={loading}
                    className="
                      w-full
                      pl-12
                      pr-12
                      py-3
                      sm:py-3.5
                      min-h-[48px]
                      rounded-xl
                      border
                      border-gray-300
                      dark:border-gray-600
                      bg-white
                      dark:bg-gray-900
                      text-gray-900
                      dark:text-white
                      text-base
                      outline-none
                      focus:ring-2
                      focus:ring-green-500
                      focus:border-transparent
                      disabled:opacity-60
                      transition
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={loading}
                    className="
                      absolute
                      right-2
                      top-1/2
                      -translate-y-1/2
                      w-9
                      h-9
                      flex
                      items-center
                      justify-center
                      rounded-lg
                      text-gray-500
                      dark:text-gray-400
                      hover:text-gray-700
                      dark:hover:text-gray-200
                      hover:bg-gray-100
                      dark:hover:bg-gray-800
                      transition
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-green-500
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}

                  </button>

                </div>

              </div>


              {/* ============================================
                  LOGIN BUTTON
              ============================================ */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  min-h-[48px]
                  bg-green-600
                  hover:bg-green-700
                  dark:bg-green-500
                  dark:hover:bg-green-600
                  active:scale-[0.99]
                  text-white
                  py-3
                  sm:py-3.5
                  rounded-xl
                  font-bold
                  flex
                  justify-center
                  items-center
                  gap-2
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-green-500
                  focus-visible:ring-offset-2
                  dark:focus-visible:ring-offset-gray-800
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        w-5
                        h-5
                        border-2
                        border-white
                        border-t-transparent
                        rounded-full
                        animate-spin
                      "
                    />

                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={20} />
                  </>
                )}

              </button>

            </form>


            {/* =================================================
                DIVIDER
            ================================================= */}

            <div className="flex items-center gap-3 my-5 sm:my-6">

              <div
                aria-hidden="true"
                className="
                  flex-1
                  h-0
                  border-t
                  border-gray-200
                  dark:border-gray-700
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-400
                  flex-shrink-0
                "
              >
                Or
              </span>

              <div
                aria-hidden="true"
                className="
                  flex-1
                  h-0
                  border-t
                  border-gray-200
                  dark:border-gray-700
                "
              />

            </div>


            {/* =================================================
                GOOGLE LOGIN
            ================================================= */}

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="
                w-full
                min-h-[48px]
                flex
                items-center
                justify-center
                gap-3
                py-3
                sm:py-3.5
                rounded-xl
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-900
                text-gray-800
                dark:text-gray-200
                text-sm
                sm:text-base
                font-semibold
                hover:bg-gray-50
                dark:hover:bg-gray-700
                active:scale-[0.99]
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-green-500
              "
            >

              {/* Google Icon */}

              <svg
                className="w-5 h-5 flex-shrink-0"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >

                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />

                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />

                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />

                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />

              </svg>

              Continue with Google

            </button>


            {/* =================================================
                FORGOT PASSWORD
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }
              disabled={loading}
              className="
                block
                mx-auto
                mt-5
                text-sm
                sm:text-base
                text-green-600
                dark:text-green-400
                font-semibold
                hover:underline
                disabled:opacity-50
                focus:outline-none
                focus-visible:underline
              "
            >
              Forgot Password?
            </button>

          </div>


          {/* ==================================================
              SECURITY MESSAGE
          ================================================== */}

          <p
            className="
              text-center
              mt-6
              mb-2
              text-xs
              sm:text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            🔒 Secure authentication powered by Carbon Tracker
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;