import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";
import Button from "../components/Button";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    age: "",
    gender: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {

    if (
      !form.fullName ||
      !form.email ||
      !form.phoneNumber ||
      !form.age ||
      !form.gender ||
      !form.password
    ) {
      return "All fields are required.";
    }

    if (form.password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    if (form.age < 10 || form.age > 100) {
      return "Please enter a valid age.";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    try {

  console.log("Sending Data:", form);

  await registerUser(form);

      toast.success("Registration Successful!");

      navigate("/login");

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Registration Failed.";

      toast.error(message);

    } finally {

      setIsSubmitting(false);

    }
  };

  // Redirects to the Spring Security OAuth2 authorization endpoint.
  // Google handles the sign-up/sign-in, then your OAuth2SuccessHandler
  // redirects back to the React app (e.g. http://localhost:5173/dashboard).
  const handleGoogleRegister = () => {
    const backendOrigin = import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, "");
    window.location.href = `${backendOrigin}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col lg:flex-row bg-white">

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
          to-emerald-900
          px-5
          py-5
          sm:px-8
          sm:py-6
        "
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full opacity-[0.08] pointer-events-none"
          viewBox="0 0 400 120"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="30" cy="20" r="60" fill="white" />
          <circle cx="370" cy="100" r="70" fill="white" />
        </svg>

        <div className="relative min-w-0">
          <p className="text-white font-black text-lg sm:text-xl leading-tight">
            🌱 Join Carbon Tracker
          </p>
          <p className="text-green-100 text-xs sm:text-sm mt-1">
            Become part of a growing community reducing carbon emissions.
          </p>
        </div>
      </div>


      {/* ======================================================
          LEFT SIDE (desktop only)
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
          to-emerald-900
          text-white
          px-10
          xl:px-16
          py-16
          flex-col
          justify-center
        "
      >

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

          <h1 className="text-4xl xl:text-5xl font-bold mb-6 leading-tight">
            🌱 Join Carbon Tracker
          </h1>

          <p className="text-base xl:text-xl text-green-100 mb-10 leading-relaxed max-w-xl">
            Become part of a growing community committed to reducing
            carbon emissions and building a sustainable future.
          </p>

          <div className="space-y-6">

            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                ♻ Track Activities
              </h3>
              <p className="text-green-100 text-sm xl:text-base">
                Record daily eco-friendly activities and monitor your impact.
              </p>
            </div>

            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                📊 Carbon Analytics
              </h3>
              <p className="text-green-100 text-sm xl:text-base">
                Visualize your carbon footprint through detailed insights.
              </p>
            </div>

            <div>
              <h3 className="text-xl xl:text-2xl font-semibold">
                🏆 Earn Rewards
              </h3>
              <p className="text-green-100 text-sm xl:text-base">
                Gain eco points and achieve sustainability milestones.
              </p>
            </div>

          </div>

          <div className="mt-12 flex gap-8 xl:gap-10">

            <div>
              <h2 className="text-3xl xl:text-4xl font-bold">500+</h2>
              <p className="text-sm xl:text-base text-green-100">Users</p>
            </div>

            <div>
              <h2 className="text-3xl xl:text-4xl font-bold">10K+</h2>
              <p className="text-sm xl:text-base text-green-100">Activities</p>
            </div>

            <div>
              <h2 className="text-3xl xl:text-4xl font-bold">20%</h2>
              <p className="text-sm xl:text-base text-green-100">CO₂ Reduction</p>
            </div>

          </div>

          <p className="mt-10 italic text-green-100 text-sm xl:text-base">
            "Every sustainable action counts."
          </p>

        </div>

      </div>

      {/* ======================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="w-full lg:w-1/2 flex-1 bg-white flex items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:p-10">

        <div className="w-full max-w-lg pb-[env(safe-area-inset-bottom)]">

          <div className="mb-5 sm:mb-6">
            <span className="bg-green-100 text-green-700 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-medium text-sm sm:text-base">
              🌱 New User
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mt-2 mb-6 sm:mb-8">
            Start your sustainability journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            <Input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />

            <Input
              type="email"
              name="email"
              inputMode="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              name="phoneNumber"
              inputMode="tel"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
            />

            <Input
              type="number"
              name="age"
              inputMode="numeric"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="
                w-full
                min-h-[48px]
                p-3
                text-base
                border
                border-gray-300
                rounded-lg
                bg-white
                text-gray-800
                outline-none
                focus:ring-2
                focus:ring-green-500
                focus:border-transparent
                transition
              "
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer Not To Say">
                Prefer Not To Say
              </option>
            </select>

            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              text={
                isSubmitting
                  ? "Creating Account..."
                  : "Create Account"
              }
              disabled={isSubmitting}
            />

          </form>

          {/* Divider */}

          <div className="flex items-center gap-3 my-5 sm:my-6">
            <div aria-hidden="true" className="flex-1 h-0 border-t border-gray-200" />
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 flex-shrink-0">
              Or
            </span>
            <div aria-hidden="true" className="flex-1 h-0 border-t border-gray-200" />
          </div>

          {/* Google */}

          <button
            type="button"
            onClick={handleGoogleRegister}
            className="
              w-full
              min-h-[48px]
              flex
              items-center
              justify-center
              gap-3
              py-3
              sm:py-3.5
              rounded-lg
              border
              border-gray-300
              bg-white
              text-gray-800
              text-sm
              sm:text-base
              font-semibold
              hover:bg-gray-50
              active:scale-[0.99]
              transition
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-green-500
            "
          >
            <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Continue with Google
          </button>

          <div className="text-center pt-6">

            <p className="text-sm sm:text-base text-gray-500">
              Already have an account?
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="
                text-sm
                sm:text-base
                text-green-600
                font-semibold
                hover:underline
                mt-1
                focus:outline-none
                focus-visible:underline
              "
            >
              Sign In
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;