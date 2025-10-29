import fetch from "node-fetch";

export default async function handler(req, res) {
  // ✅ Allowed frontend origins
  const allowedOrigins = [
    "https://appdost-assignment.netlify.app", // your frontend
    "http://localhost:5173" // for local testing
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight (CORS) request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const category = req.query.category || "general";
    const page = req.query.page || 1;

    // ✅ Securely load your GNews API key from environment variables
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
      throw new Error("Missing GNEWS_API_KEY environment variable");
    }

    // ✅ Fetch directly from GNews API
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=in&page=${page}&apikey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
