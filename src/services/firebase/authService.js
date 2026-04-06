import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../config/firebase.config";
import { getFirebaseError } from "../utils/errorHandler";

// ─── Setup Invisible Recaptcha ────────────────────────────────────────────────
export const setupRecaptcha = (containerId = "recaptcha-container") => {
  try {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {},
      "expired-callback": () => {
        window.recaptchaVerifier = null;
      },
    });

    return window.recaptchaVerifier;
  } catch (error) {
    throw error;
  }
};

// ─── Send OTP ─────────────────────────────────────────────────────────────────
export const sendPhoneOTP = async (mobileNumber) => {
  try {
    const phoneNumber = `+91${mobileNumber}`;
    const appVerifier = setupRecaptcha();
    const confirmation = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier,
    );

    return { success: true, confirmation };
  } catch (error) {
    window.recaptchaVerifier = null;

    return {
      success: false,
      error: getFirebaseError(error),
    };
  }
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────
export const verifyPhoneOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    const firebaseUser = result.user;
    const token = await firebaseUser.getIdToken();

    return { success: true, firebaseUser, token };
  } catch (error) {

    return {
      success: false,
      error: getFirebaseError(error),
    };
  }
};

// ─── Resend OTP ───────────────────────────────────────────────────────────────
export const resendPhoneOTP = async (mobileNumber) => {
  window.recaptchaVerifier = null;
  return await sendPhoneOTP(mobileNumber);
};

// ─── Sign Out ─────────────────────────────────────────────────────────────────
export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: getFirebaseError(error),
    };
  }
};

// ─── Auth State Listener ──────────────────────────────────────────────────────
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ─── Get Current User ─────────────────────────────────────────────────────────
export const getCurrentUser = () => {
  return auth.currentUser;
};
