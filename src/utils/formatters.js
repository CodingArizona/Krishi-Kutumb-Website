// ─── Mobile Number ────────────────────────────────────────────────────────────
export const formatMobile = (mobile) => {
  if (!mobile) return "";
  const cleaned = mobile.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return mobile;
};

export const maskMobile = (mobile) => {
  if (!mobile) return "";
  const cleaned = mobile.replace(/\D/g, "").slice(-10);
  return `XXXXX ${cleaned.slice(5)}`;
};

// ─── Date Formatters ──────────────────────────────────────────────────────────
export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

export const formatDateTime = (dateStr) => {
  if (!dateStr) return "";
  try {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return dateStr;
  }
};

// Django API ke liye date format: DD-MM-YYYY HH:MM:SS DayOfWeek
export const formatForAPI = (date = new Date()) => {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[d.getDay()];
  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss} ${day}`;
};

export const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "Abhi abhi";
  if (diff < 3600) return `${Math.floor(diff / 60)} minute pehle`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ghante pehle`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} din pehle`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} mahine pehle`;
  return `${Math.floor(diff / 31536000)} saal pehle`;
};

// ─── Currency ─────────────────────────────────────────────────────────────────
export const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num) => {
  if (!num && num !== 0) return "0";
  return new Intl.NumberFormat("en-IN").format(num);
};

// ─── Distance ─────────────────────────────────────────────────────────────────
export const formatDistance = (km) => {
  if (!km && km !== 0) return "";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${parseFloat(km).toFixed(1)} km`;
};

// ─── File Size ────────────────────────────────────────────────────────────────
export const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// ─── Name ─────────────────────────────────────────────────────────────────────
export const formatFullName = (firstName, lastName) => {
  return `${firstName || ""} ${lastName || ""}`.trim();
};

export const getInitials = (firstName, lastName) => {
  const f = firstName?.[0]?.toUpperCase() || "";
  const l = lastName?.[0]?.toUpperCase() || "";
  return `${f}${l}` || "??";
};

// ─── Capitalize ───────────────────────────────────────────────────────────────
export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const titleCase = (str) => {
  if (!str) return "";
  return str.split(" ").map(capitalize).join(" ");
};
