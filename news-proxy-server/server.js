app.get("/news", async (req, res) => {
  try {
    const { q, category, type } = req.query;
    let apiUrl = "";

    if (type === "search" && q) {
      apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=en&country=in&max=10&page=1&token=${process.env.API_KEY}`;
    } else {
      apiUrl = `https://gnews.io/api/v4/top-headlines?category=${category || "general"}&lang=en&country=in&max=10&page=1&token=${process.env.API_KEY}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});
