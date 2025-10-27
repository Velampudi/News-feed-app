import React from "react";

export default function ArticleCard({ article }) {
  const { title, description, url, source, publishedAt, image } = article;
  const imgSrc = image || "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:-translate-y-1 flex flex-col md:flex-row">
      <div className="relative w-full md:w-2/5">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-56 md:h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+Image";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <span className="text-xs text-white font-medium uppercase tracking-wide">
            {source?.name || "Unknown Source"}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-between p-5 md:w-3/5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors leading-snug">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
            {description || "No description available."}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{publishedAt ? new Date(publishedAt).toLocaleDateString() : ""}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Read →
          </a>
        </div>
      </div>
    </article>
  );
}

