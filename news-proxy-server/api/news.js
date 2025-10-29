export default async function handler(req, res) {
  // ✅ Allow your Netlify frontend to access this API
  res.setHeader("Access-Control-Allow-Origin", "https://appdost-assignment.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const category = req.query.category || "general";
    const page = req.query.page || 1;

    // ✅ Fetch from GNews API using your API key from environment variable
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
