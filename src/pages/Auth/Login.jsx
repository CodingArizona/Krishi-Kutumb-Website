import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Leaf, Phone } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routeConfig";
import useAuthStore from "../../store/authStore";
import { validateMobile } from "../../utils/validators";
import Header from "../../components/Common/Header";

const Login = () => {
  const navigate = useNavigate();
  const { isLoggedIn, role } = useAuthStore();
  const { sendOTP, isLoading, error, clearError } = useAuth();

  const [mobile, setMobile] = useState("");
  const [mobileErr, setMobileErr] = useState("");

  if (isLoggedIn && role) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  const handleChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobile(val);
    if (mobileErr) setMobileErr("");
    if (error) clearError();
  };

  const handleSubmit = async () => {
    const err = validateMobile(mobile);
    if (err) {
      setMobileErr(err);
      return;
    }
    const result = await sendOTP(mobile);
    if (result.success) navigate(ROUTES.OTP, { state: { mobile } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-6 bg-gradient-to-br bg-gray-50">
        {/* ── Logo ── */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-md bg-green-500">
            <Leaf size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Krishi Kutumb</h1>
          <p className="text-gray-400 text-sm mt-1">Smart Farming Solutions</p>
        </div>

        {/* ── Card ── */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden mb-4 bg-white shadow-sm">
            <div className="flex items-center gap-2 px-4 py-4 border-r border-gray-200 shrink-0">
              <Phone size={16} className="text-green-500" />
              <span className="text-sm font-bold text-gray-700">+91</span>
            </div>
            <input
              type="tel"
              value={mobile}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="10 digit number"
              className="flex-1 px-4 py-4 text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
              autoFocus
            />
          </div>

          {(mobileErr || error) && (
            <p className="text-red-500 text-xs mb-3 flex items-center gap-1">
              <span>⚠</span> {mobileErr || error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={mobile.length < 10 || isLoading}
            className="w-full py-4 rounded-2xl text-sm font-bold text-white transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
            style={{
              backgroundColor: mobile.length === 10 ? "#22c55e" : "#d1d5db",
            }}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </button>
        </div>

        <div id="recaptcha-container" />
      </div>
    </div>
  );
};

export default Login;