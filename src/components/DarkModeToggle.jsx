import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    // Persistance du choix utilisateur
    const saved = localStorage.getItem("aurora-mode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("aurora-mode", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <button
      className="darkmode-btn"
      aria-pressed={isDark}
      onClick={() => setIsDark((v) => !v)}
      title={isDark ? "Revenir au mode clair" : "Activer le mode aurora"}
    >
      {isDark ? "☀️ Clair" : "🌌 Aurora"}
    </button>
  );
};

export default DarkModeToggle;
