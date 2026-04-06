// ─── Mobile Number ────────────────────────────────────────────────────────────
export const validateMobile = (mobile) => {
  if (!mobile) return "Mobile number is required.";
  if (!/^[6-9]\d{9}$/.test(mobile))
    return "Enter a valid 10 digit mobile number.";
  return null;
};

// ─── OTP ──────────────────────────────────────────────────────────────────────
export const validateOTP = (otp) => {
  if (!otp) return "OTP is required.";
  if (!/^\d{6}$/.test(otp)) return "Enter a 6 digit OTP.";
  return null;
};

// ─── Name ─────────────────────────────────────────────────────────────────────
export const validateFirstName = (name) => {
  if (!name?.trim()) return "First name is required.";
  if (name.trim().length < 2) return "At least 2 characters are required.";
  if (name.trim().length > 50) return "Maximum 50 characters allowed.";
  return null;
};

export const validateLastName = (name) => {
  if (!name?.trim()) return "Last name is required.";
  return null;
};

// ─── Validate Full Form ───────────────────────────────────────────────────────
export const validateForm = (fields) => {
  const errors = {};

  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    let error = null;

    switch (key) {
      case "mobile":
        error = validateMobile(value);
        break;
      case "otp":
        error = validateOTP(value);
        break;
      case "firstName":
        error = validateFirstName(value);
        break;
      case "lastName":
        error = validateLastName(value);
        break;
      default:
        if (!value && value !== 0) error = `${key} is required.`;
    }

    if (error) errors[key] = error;
  });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
