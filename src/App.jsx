import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArticleCard from "./components/ArticleCard";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = "https://news-proxy-server-mjn1f2gic-velampudi-s-projects.vercel.app";



const CATEGORIES = [
  "general",
  "technology",
  "business",
  "sports",
  "health",
  "science",
  "entertainment",
];

export default function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNews();
  }, [category]);

async function fetchNews(search = "", page = 1, category = "general") {
  setLoading(true);
  setError("");

  try {
    let url = "";
    if (search) {
      url = `${API_URL}?q=${encodeURIComponent(search)}&page=${page}`;
    } else {
      url = `${API_URL}?category=${category}&page=${page}`;
    }

    console.log("Fetching from URL:", url);

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);

    const data = await res.json();
    if (!data.articles) throw new Error("No articles found");

    if (page === 1) setArticles(data.articles);
    else setArticles((prev) => [...prev, ...data.articles]);
  } catch (err) {
    console.error("Error:", err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
}



  function handleSearch(q) {
    setQuery(q);
    fetchNews(q);
  }

  function selectCategory(cat) {
    setCategory(cat);
    setQuery("");
  }

  return (

    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-all p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <img
              src="https://st4.depositphotos.com/1185628/24546/v/450/depositphotos_245467064-stock-illustration-newspaper-icon-vector-template.jpg"
              alt="News logo"
              className="w-10 h-10 object-contain rounded-md"
            />
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                NewsFeed
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Latest headlines from around the world
              </p>
            </div>
          </div>

          <ThemeToggle />
        </header>

        <section className="mb-6 flex flex-col gap-4">
          <SearchBar onSearch={handleSearch} />
          <div className="flex cursor-pointer flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`px-3 py-1 cursor-pointer rounded-full border ${cat === category
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        <main>
          {loading && <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          }
          {error && (
            <div className="text-center text-red-500 py-4">
              Something went wrong: {error}
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-10 text-slate-600 dark:text-slate-300">
              No articles found. Try a different search or category.
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6"
          >
            {articles.map((article) => (
              <ArticleCard key={article.url} article={article} />
            ))}
          </motion.div>
        </main>


        <footer className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
          Powered by <a href="https://gnews.io" className="underline">GNews.io</a>
        </footer>
      </div>
    </div>
  );
}
