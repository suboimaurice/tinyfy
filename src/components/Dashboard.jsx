import React, { useEffect, useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Dashboard() {
  const [stats, setStats] = useState({ users: 0, links: 0, analytics: [] });

  useEffect(() => {
    // Replace with your backend endpoints
    Promise.all([
      fetch(`${API_BASE_URL}/api/links/count`)
      .then(res => res.json()),
    ])
    .then(([linkData]) => {
      setStats({
        links: linkData.count,
      });
    });
  }, []);

  return (
  <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0a16] to-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 w-full max-w-4xl">
        <div className="flex-1 bg-[#2d112b] rounded-xl p-6 shadow text-center">
          <div className="text-2xl md:text-4xl font-bold">{stats.links}</div>
          <div className="text-lg md:text-xl">Shortened Links</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
