import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
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
  <div className="min-h-screen flex">

    {/* LEFT SIDE */}

    <div className="w-1/2 bg-gradient-to-br from-green-700 to-emerald-900 text-white p-16 flex flex-col justify-center">

      <h1 className="text-6xl font-bold mb-6">
        🌱 Join Carbon Tracker
      </h1>

      <p className="text-xl text-green-100 mb-10 leading-relaxed">
        Become part of a growing community committed to reducing
        carbon emissions and building a sustainable future.
      </p>

      <div className="space-y-6">

        <div>
          <h3 className="text-2xl font-semibold">
            ♻ Track Activities
          </h3>
          <p className="text-green-100">
            Record daily eco-friendly activities and monitor your impact.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">
            📊 Carbon Analytics
          </h3>
          <p className="text-green-100">
            Visualize your carbon footprint through detailed insights.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">
            🏆 Earn Rewards
          </h3>
          <p className="text-green-100">
            Gain eco points and achieve sustainability milestones.
          </p>
        </div>

      </div>

      <div className="mt-12 flex gap-10">

        <div>
          <h2 className="text-4xl font-bold">500+</h2>
          <p>Users</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold">10K+</h2>
          <p>Activities</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold">20%</h2>
          <p>CO₂ Reduction</p>
        </div>

      </div>

      <p className="mt-10 italic text-green-100">
        "Every sustainable action counts."
      </p>

    </div>

    {/* RIGHT SIDE */}

    <div className="w-1/2 bg-white flex items-center justify-center">

      <div className="w-full max-w-lg p-10">

        <div className="mb-6">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            🌱 New User
          </span>
        </div>

        <h2 className="text-4xl font-bold text-gray-800">
          Create Account
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Start your sustainability journey today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Or
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-3
            py-3.5
            rounded-lg
            border
            border-gray-300
            bg-white
            text-gray-800
            font-semibold
            hover:bg-gray-50
            transition
          "
        >
          <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
          </svg>
          Continue with Google
        </button>

        <div className="text-center pt-6">

          <p className="text-gray-500">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-green-600 font-semibold hover:underline mt-1"
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