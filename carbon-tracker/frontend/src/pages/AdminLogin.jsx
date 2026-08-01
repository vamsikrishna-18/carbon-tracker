import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginAdmin } from "../services/authService";

function AdminLogin() {
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
      const response = await loginAdmin(form);

      const { user } = response.data;

      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome Admin ${user.fullName}!`);

      navigate("/admin-dashboard");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Invalid Admin Credentials";

      toast.error(message);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <div className="min-h-screen flex">

    {/* LEFT SIDE */}

    <div className="w-1/2 bg-gradient-to-br from-indigo-700 to-purple-900 text-white p-16 flex flex-col justify-center">

      <h1 className="text-6xl font-bold mb-6">
        🛡️ Admin Portal
      </h1>

      <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
        Manage users, monitor sustainability data,
        generate reports, and oversee the Carbon Tracker platform.
      </p>

      <div className="space-y-6">

        <div>
          <h3 className="text-2xl font-semibold">
            👥 User Management
          </h3>
          <p className="text-indigo-100">
            View and manage registered users.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">
            📈 Analytics & Reports
          </h3>
          <p className="text-indigo-100">
            Monitor platform-wide carbon reduction metrics.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">
            ⚙️ System Configuration
          </h3>
          <p className="text-indigo-100">
            Configure settings and platform controls.
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
          <h2 className="text-4xl font-bold">99.9%</h2>
          <p>Uptime</p>
        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}

    <div className="w-1/2 bg-white flex items-center justify-center">

      <div className="w-full max-w-md p-10">

        <div className="mb-8">
          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium">
            🛡️ Admin Portal
          </span>
        </div>

        <h2 className="text-4xl font-bold text-gray-800">
          Admin Login
        </h2>

        <p className="text-gray-500 mt-2 mb-8">
          Sign in to access the administration dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            type="email"
            name="email"
            placeholder="Admin Email"
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

          <Button
            type="submit"
            disabled={isSubmitting}
            text={
              isSubmitting
                ? "Logging in..."
                : "Login as Admin"
            }
          />

        </form>

      </div>

    </div>

  </div>
);
}

export default AdminLogin;