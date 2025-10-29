export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://appdost-assignment.netlify.app");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const category = req.query.category || "general";
  const page = req.query.page || 1;
  const apiKey = process.env.GNEWS_API_KEY; // Your actual API key stored in Vercel env

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&page=${page}&apikey=${apiKey}`
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
