import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);
const [timer, setTimer] = useState(60);
const [canResend, setCanResend] = useState(false);  
// STEP 1 - Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await forgotPassword({ email });

      toast.success(res.data);

      setStep(2);
    } catch (err) {
      toast.error(err.response?.data || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2 - Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOtp({
        email,
        otp,
      });

      toast.success(res.data);

      setStep(3);
    } catch (err) {
      toast.error(err.response?.data || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3 - Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      toast.error("Password should be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword({
        email,
        otp,
        newPassword,
      });

      toast.success(res.data);

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Forgot Password
        </h2>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-5">

            <Input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              type="submit"
              text={loading ? "Sending OTP..." : "Send OTP"}
            />

          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">

            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              type="submit"
              text={loading ? "Verifying..." : "Verify OTP"}
            />

          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-5">

           <div className="relative">

  <Input
    type={showPassword ? "text" : "password"}
    placeholder="Enter New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
  />

  <button
    type="button"
    className="absolute right-4 top-3"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
  </button>

</div>
<div className="text-sm text-gray-500">

{newPassword.length === 0 && ""}

{newPassword.length > 0 && newPassword.length < 8 &&
<p className="text-red-500">
Weak Password
</p>}

{newPassword.length >= 8 &&
<p className="text-green-600">
Strong Password
</p>}

</div>
            <Button
              type="submit"
              text={loading ? "Updating..." : "Reset Password"}
            />

          </form>
        )}

      </div>
    </MainLayout>
  );
}

export default ForgotPassword;