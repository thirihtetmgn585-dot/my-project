"use client";

import { ReactNode, useEffect, useState } from "react";

export default function ReaderControls({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(19);
  const [darkMode, setDarkMode] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className={darkMode ? "reader-theme reader-theme-dark" : "reader-theme"}
      style={{ fontSize: `${fontSize}px` }}
    >
      <div className="reader-progress" aria-label={`Reading progress ${Math.round(progress)} percent`}>
        <span style={{ width: `${progress}%` }} />
      </div>
      <div className="reader-controls" aria-label="Reading controls">
        <button type="button" onClick={() => setFontSize((size) => Math.max(14, size - 1))}>
          A−
        </button>
        <span>{fontSize}px</span>
        <button type="button" onClick={() => setFontSize((size) => Math.min(30, size + 1))}>
          A+
        </button>
        <button type="button" onClick={() => setDarkMode((enabled) => !enabled)}>
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </div>
      {children}
    </div>
  );
}
