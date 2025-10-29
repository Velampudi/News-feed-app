export default async function handler(req, res) {
  // ✅ Allow only your frontend and test URLs
  const allowedOrigins = [
    "https://appdost-assignment.netlify.app",
    "https://news-proxy-server.vercel.app",
    "http://localhost:5173",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // ✅ Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const category = req.query.category || "general";
    const page = req.query.page || 1;

    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&page=${page}&lang=en&apikey=${process.env.GNEWS_API_KEY}`
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
