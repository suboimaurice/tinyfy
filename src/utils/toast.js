import { toast } from "react-hot-toast";

const baseStyle = {
  borderRadius: "10px",
  background: "#f1c5ef",
  color: "#2d112b",
  fontWeight: "400",
  boxShadow: "0px 4px 14px rgba(0,0,0,0.08)",
};

const baseOptions = {
  duration: 4000,
  position: "top-center",
};

export const showSuccess = (message = "Success", options = {}) =>
  toast.success(message, {
    ...baseOptions,
    style: baseStyle,
    iconTheme: {
      primary: "#10b981",
      secondary: "#fff",
    },
    ...options,
  });

export const showError = (message = "Something went wrong", options = {}) =>
  toast.error(message, {
    ...baseOptions,
    style: {
      ...baseStyle,
      background: "#fef2f2",
      color: "#991b1b",
    },
    iconTheme: {
      primary: "#ef4444", // red
      secondary: "#fff",
    },
    ...options,
  });

export const showToast = (message, options = {}) =>
  toast(message, {
    ...baseOptions,
    style: baseStyle,
    ...options,
  });