import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  Users,
  Leaf,
  Moon,
  Sun,
} from "lucide-react";

import axios from "axios";

function OrganizationLogin() {
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
  // LOGIN
  // ============================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      console.log("========== ORGANIZATION LOGIN ==========");
      console.log("EMAIL:", cleanEmail);

      const response = await axios.post(
        "http://localhost:8080/api/user/login",
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

      console.log("ORGANIZATION LOGIN RESPONSE:", response.data);

      const loggedInUser = response.data?.user;

      if (!loggedInUser) {
        throw new Error(
          "Login successful but organization information was not returned."
        );
      }

      console.log("LOGGED IN ACCOUNT:", loggedInUser);
      console.log("ROLE:", loggedInUser.role);

      // ========================================================
      // CHECK ORGANIZATION ROLE
      // ========================================================

      if (loggedInUser.role !== "ORGANIZATION") {
        alert(
          "This account is not an organization account."
        );

        return;
      }

      // ========================================================
      // CLEAR OLD LOGIN DATA
      // ========================================================

      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      localStorage.removeItem("organization");

      // ========================================================
      // SAVE ORGANIZATION
      // ========================================================

      localStorage.setItem(
        "organization",
        JSON.stringify(loggedInUser)
      );

      // Also store generic user if your existing components
      // depend on the "user" key.
      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      console.log("ORGANIZATION LOGIN SUCCESS");

      // ========================================================
      // REDIRECT
      // ========================================================

      navigate("/organization/dashboard", {
        replace: true,
      });

    } catch (error) {
      console.error("ORGANIZATION LOGIN ERROR:", error);

      console.error(
        "STATUS:",
        error.response?.status
      );

      console.error(
        "SERVER RESPONSE:",
        error.response?.data
      );

      let message = "Invalid organization email or password.";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (
        typeof error.response?.data === "string"
      ) {
        message = error.response.data;
      } else if (
        error.message === "Network Error"
      ) {
        message =
          "Unable to connect to the server. Please make sure the backend is running.";
      } else if (error.response?.status === 404) {
        message = "Login service was not found.";
      } else if (error.response?.status === 401) {
        message = "Invalid email or password.";
      } else if (error.response?.status === 403) {
        message =
          "This account is not allowed to access the organization portal.";
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
  // RENDER
  // ============================================================

  return (
    <div
      className="
        min-h-screen
        w-full
        flex
        bg-gray-50
        dark:bg-gray-950
        transition-colors
        duration-300
      "
    >

      {/* ======================================================
          LEFT SECTION
      ====================================================== */}

      <div
        className="
          hidden
          lg:flex
          lg:w-1/2

          bg-gradient-to-br
          from-green-700
          to-green-900

          dark:from-gray-900
          dark:to-black

          text-white

          p-16

          flex-col
          justify-center
        "
      >

        <Building2
          size={70}
          className="text-green-300"
        />

        <h1 className="text-5xl font-black mt-8">
          Carbon Tracker
        </h1>

        <h2 className="text-3xl font-bold mt-5">
          Corporate Sustainability 🌱
        </h2>

        <p className="mt-6 text-lg text-green-100 max-w-xl">
          Empower your organization to monitor employee
          carbon emissions, analyze sustainability
          performance and build a greener workplace.
        </p>

        {/* FEATURES */}

        <div className="mt-10 space-y-5">

          {/* Employees */}

          <div className="flex items-center gap-4">

            <div className="bg-white/15 p-3 rounded-xl">
              <Users />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Manage Employees
              </h3>

              <p className="text-green-100 text-sm">
                Monitor and manage your organization's
                employees.
              </p>
            </div>

          </div>

          {/* Analytics */}

          <div className="flex items-center gap-4">

            <div className="bg-white/15 p-3 rounded-xl">
              <BarChart3 />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Track Sustainability
              </h3>

              <p className="text-green-100 text-sm">
                Analyze carbon emissions and sustainability
                performance.
              </p>
            </div>

          </div>

          {/* Carbon */}

          <div className="flex items-center gap-4">

            <div className="bg-white/15 p-3 rounded-xl">
              <Leaf />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                Reduce Carbon Footprint
              </h3>

              <p className="text-green-100 text-sm">
                Create a greener and more sustainable
                organization.
              </p>
            </div>

          </div>

        </div>

        <p className="mt-12 italic text-green-100 text-lg">
          "Together, organizations can build a sustainable future 🌍"
        </p>

      </div>


      {/* ======================================================
          RIGHT SECTION
      ====================================================== */}

      <div
        className="
          w-full
          lg:w-1/2

          flex
          items-center
          justify-center

          p-6

          relative
        "
      >

        {/* ====================================================
            THEME BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={toggleTheme}
          className="
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
          "
          title="Toggle Theme"
        >

          {darkMode ? (
            <Sun size={22} />
          ) : (
            <Moon size={22} />
          )}

        </button>


        <div className="w-full max-w-md">

          {/* ==================================================
              LOGO
          ================================================== */}

          <div className="text-center mb-8">

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
              <Building2 size={42} />
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
              Organization Login
            </h1>

            <p
              className="
                mt-2

                text-gray-500
                dark:text-gray-400
              "
            >
              Access your corporate sustainability portal
            </p>

          </div>


          {/* ==================================================
              LOGIN CARD
          ================================================== */}

          <div
            className="
              bg-white
              dark:bg-gray-800

              rounded-3xl

              shadow-2xl

              p-8

              border
              border-gray-200
              dark:border-gray-700
            "
          >

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label
                  htmlFor="organization-email"
                  className="
                    block
                    mb-2

                    font-semibold

                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Organization Email
                </label>

                <div className="relative">

                  <Mail
                    size={20}
                    className="
                      absolute
                      left-4
                      top-3.5

                      text-gray-400
                    "
                  />

                  <input
                    id="organization-email"
                    type="email"
                    placeholder="Enter organization email"
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

                      rounded-xl

                      border
                      border-gray-300
                      dark:border-gray-600

                      bg-white
                      dark:bg-gray-900

                      text-gray-900
                      dark:text-white

                      outline-none

                      focus:ring-2
                      focus:ring-green-500

                      disabled:opacity-60
                    "
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div>

                <label
                  htmlFor="organization-password"
                  className="
                    block
                    mb-2

                    font-semibold

                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={20}
                    className="
                      absolute
                      left-4
                      top-3.5

                      text-gray-400
                    "
                  />

                  <input
                    id="organization-password"
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

                      rounded-xl

                      border
                      border-gray-300
                      dark:border-gray-600

                      bg-white
                      dark:bg-gray-900

                      text-gray-900
                      dark:text-white

                      outline-none

                      focus:ring-2
                      focus:ring-green-500

                      disabled:opacity-60
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={loading}
                    className="
                      absolute
                      right-4
                      top-3

                      text-gray-500
                      dark:text-gray-400

                      hover:text-gray-700
                      dark:hover:text-gray-200
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}

                  </button>

                </div>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full

                  bg-green-600
                  hover:bg-green-700

                  dark:bg-green-500
                  dark:hover:bg-green-600

                  text-white

                  py-3.5

                  rounded-xl

                  font-bold

                  flex
                  justify-center
                  items-center
                  gap-2

                  transition

                  disabled:opacity-60
                  disabled:cursor-not-allowed
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
                    Login to Corporate Portal
                    <ArrowRight size={20} />
                  </>
                )}

              </button>

            </form>


            {/* =================================================
                BACK TO NORMAL LOGIN
            ================================================= */}

            <button
              type="button"
              onClick={() => navigate("/login")}
              disabled={loading}
              className="
                block
                mx-auto

                mt-5

                text-green-600
                dark:text-green-400

                font-semibold

                hover:underline

                disabled:opacity-50
              "
            >
              ← Back to User Login
            </button>

          </div>


          {/* SECURITY */}

          <p
            className="
              text-center

              mt-6

              text-sm

              text-gray-500
              dark:text-gray-400
            "
          >
            🔒 Secure organization authentication
          </p>

        </div>

      </div>

    </div>
  );
}

export default OrganizationLogin;