import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    onSearch(q.trim());
  }

  return (
    <form onSubmit={submit} className="flex gap-2 items-center w-full">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search news (e.g., bitcoin, india, technology)..."
        className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none"
      />
      <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 text-white ">
        Search
      </button>
    </form>
  );
}
