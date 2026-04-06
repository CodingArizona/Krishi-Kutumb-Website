import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Edit2, Lock, Unlock } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { ROUTES } from "../../routes/routeConfig";
import { maskMobile } from "../../utils/formatters";
import Header from "../../components/Common/Header";

const OTP_LENGTH = 6;

const OTPValidation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile || "";

  const { verifyOTP, resendOTP, isLoading, error, clearError, resendTimer } =
    useAuth();

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!mobile) navigate(ROUTES.LOGIN, { replace: true });
  }, [mobile]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (error) clearError();

    const newOtp = [...otp];

    if (value.length > 1) {
      const digits = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      digits.split("").forEach((d, i) => {
        if (index + i < OTP_LENGTH) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const nextIdx = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIdx]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") handleVerify();
  };

  const handleVerify = async () => {
    const otpStr = otp.join("");
    if (otpStr.length < OTP_LENGTH) return;
    await verifyOTP(otpStr, mobile);
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    await resendOTP(mobile);
  };

  const otpFilled = otp.every((d) => d !== "");

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center px-4 bg-gray-50">
        {/* Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 animate-fadeIn">
          <h2 className="text-3xl font-bold text-gray-800 mb-7 text-center">
            Enter OTP
          </h2>

          {/* Phone Display */}
          <div className="bg-green-50 rounded-xl p-4 mb-9 flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-xs font-semibold">Your Number</p>
              <p className="text-gray-800 text-xl font-bold">
                +91 {maskMobile(mobile)}
              </p>
            </div>
            <button
              onClick={() => navigate(ROUTES.LOGIN)}
              className="bg-green-500 hover:bg-green-300 text-white p-2 rounded-lg transition-colors flex items-center gap-1"
            >
              <Edit2 className="w-4 h-4" />
              <span className="text-sm font-semibold">Change</span>
            </button>
          </div>

          {/* OTP Inputs */}
          <div className="mb-8">
            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  id={`otp-${index}`}
                  type="tel"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-14 h-14 border-2 rounded-lg text-center text-3xl font-bold focus:outline-none transition-colors
                    ${
                      error
                        ? "border-red-400 text-red-500"
                        : "border-gray-200 text-green-500 focus:border-green-500"
                    }`}
                  autoFocus={index === 0}
                />
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-xs text-center mt-3 flex items-center justify-center gap-1">
                <span>⚠</span> {error}
              </p>
            )}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading || !otpFilled}
            className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 flex items-center justify-center gap-2
              ${
                isLoading || !otpFilled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-300 active:scale-95"
              }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verifying...
              </>
            ) : otpFilled ? (
              <>
                <Unlock className="w-5 h-5" />
                Verify OTP
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Verify OTP
              </>
            )}
          </button>

          {/* Resend OTP */}
          <div className="text-center mt-6">
            {resendTimer > 0 ? (
              <p className="text-gray-300 text-sm">
                Resend in{" "}
                <span className="font-bold text-green-300">{resendTimer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="text-green-300 hover:text-green-700 hover:underline font-semibold text-sm disabled:opacity-50"
              >
                Resend OTP
              </button>
            )}
          </div>

          <div id="recaptcha-container" />
        </div>
      </div>
    </div>
  );
};

export default OTPValidation;
