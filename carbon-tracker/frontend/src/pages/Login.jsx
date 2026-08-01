import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await loginUser(form);

      const { user } = response.data;

      if (!user) {
        toast.error("Login failed.");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome ${user.fullName}!`);

      navigate("/dashboard");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid Email or Password";

      toast.error(message);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="min-h-screen flex">

    {/* LEFT SIDE */}

    <div className="w-1/2 bg-gradient-to-br from-green-700 to-emerald-900 text-white p-16 flex flex-col justify-center">

      <h1 className="text-6xl font-bold mb-6">
        🌱 Carbon Tracker
      </h1>

      <p className="text-xl text-green-100 mb-10 leading-relaxed">
        Track your carbon footprint, monitor daily activities,
        analyze emissions and contribute towards a sustainable future.
      </p>

      <div className="space-y-6">

        <div>
          <h3 className="text-2xl font-semibold">
            📊 Analytics Dashboard
          </h3>
          <p className="text-green-100">
            Visualize your carbon emissions through interactive charts.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">
            ♻ Activity Tracking
          </h3>
          <p className="text-green-100">
            Record eco-friendly activities and monitor impact.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">
            🏆 Reward System
          </h3>
          <p className="text-green-100">
            Earn eco points and achieve sustainability goals.
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

    </div>

    {/* RIGHT SIDE */}

    <div className="w-1/2 bg-white flex items-center justify-center">

      <div className="w-full max-w-md p-10">

        <div className="mb-8">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
            👤 User Portal
          </span>
        </div>

        <h2 className="text-4xl font-bold text-gray-800">
          Welcome Back
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Login to continue your sustainability journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-green-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            text={
              isSubmitting
                ? "Logging in..."
                : "Login as User"
            }
          />

        </form>

      </div>

    </div>

  </div>
);
}

export default Login;