import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle theme"
      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 
                 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 
                 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 shadow-sm"
    >
      {dark ? (
        <>
          <Sun className="w-4 cursor-pointer h-4 text-yellow-400" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 cursor-pointer text-blue-400" />
          <span>Dark</span>
        </>
      )}
    </button>
  );
}
