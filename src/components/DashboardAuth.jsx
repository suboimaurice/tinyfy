import React, { useState } from "react";
import { showSuccess } from "../utils/toast";

const DASHBOARD_PASSWORD = "suboi2019"; // Change this to your own password

function DashboardAuth({ children }) {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("dashboardAuth") === "true"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("dashboardAuth", "true");
        showSuccess("Access granted");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a0a16] to-black">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm flex flex-col items-center relative">
          <h2 className="text-2xl font-bold mb-4 text-[#2d112b]">Dashboard Access</h2>
          
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter dashboard password"
            className="w-full p-2 mb-4 border-1 border-[#ecbce9] rounded-lg text-[#941e8c] text-lg text-center focus:outline-none focus:ring-1 focus:ring-[#974091] transition"
          />
          {error && <div className="w-auto text-center bg-red-100 border-1 border-red-300 px-2 py-1 rounded-lg relative text-red-500 mb-2">{error}</div>}
          <button type="submit" className="w-full py-3 px-6 bg-[#2d112b] text-white rounded-xl font-semibold shadow hover:bg-[#e483dd] hover:text-[#2d112b] transition">Access Dashboard</button>
        </form>
      </div>
    );
  }

  return children;
}

export default DashboardAuth;
