// ─── errorHandlers.js ─────────────────────────────────────────────────────────

import {
  validateMobile,
  validateOTP,
  validateFirstName,
  validateLastName,
} from "../../utils/validators";

// ─── Firebase Error Messages ──────────────────────────────────────────────────
const FIREBASE_ERRORS = {
  "auth/too-many-requests": "Too many attempts, Please Try Again Later",
  "auth/invalid-phone-number": "Invalid mobile number, Check and try again.",
  "auth/invalid-verification-code": "Invalid OTP, Please Try Again",
  "auth/code-expired": "OTP expired, Please Resend",
  "auth/network-request-failed":
    "Network error, Check Your Internet Connection",
  "auth/quota-exceeded": "SMS limit exceeded, Please Try Again Later.",
  "auth/user-disabled": "Your account has been disabled.",
  "auth/operation-not-allowed": "Phone login is currently disabled.",
  "auth/missing-phone-number": "Mobile number required.",
  "auth/captcha-check-failed": "Captcha not verified, Please Try Again.",
  "auth/web-storage-unsupported": "Browser storage is not supported.",
};

// ─── API Error Messages ───────────────────────────────────────────────────────
const API_ERRORS = {
  400: "Invalid request, Please check the Data.",
  401: "Session expired, Please Log in again.",
  403: "You don't have permission to access this.",
  404: "Data Not Found.",
  408: "Request timeout, Try again Later.",
  500: "Server error, Try again Later.",
  502: "Server is currently unavailable.",
  503: "Service temporarily unavailable.",
};

// ─── Get Firebase Error Message ───────────────────────────────────────────────
export const getFirebaseError = (error) => {
  const code = error?.code || "";
  return FIREBASE_ERRORS[code] || "Something Went Wrong, Please Try Again.";
};

// ─── Get API Error Message ────────────────────────────────────────────────────
export const getErrorMessage = (error) => {
  if (!error.response) {
    if (error.code === "ECONNABORTED") {
      return "Request timeout, Please Check Your Internet Connection.";
    }
    return "Network error, Please Check Your Internet Connection.";
  }

  const status = error.response?.status;
  return (
    API_ERRORS[status] ||
    error.response?.data?.message ||
    "Something Went Wrong, Please Try Again."
  );
};

// ─── Handle Async Errors ──────────────────────────────────────────────────────
export const handleAsyncError = (error, fallback = "Something Went Wrong.") => {
  if (error?.code) return getFirebaseError(error);
  if (error?.response) return getErrorMessage(error);
  return error?.message || fallback;
};

// ─── Validation Errors — validators.js se delegate karo ──────────────────────
const VALIDATOR_MAP = {
  mobile: validateMobile,
  otp: validateOTP,
  firstName: validateFirstName,
  lastName: validateLastName,
};

export const getValidationError = (field, value) => {
  return VALIDATOR_MAP[field]?.(value) ?? null;
};
