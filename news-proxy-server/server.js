// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "*", methods: ["GET"] }));

app.get("/news", async (req, res) => {
  try {
    const { q, category, type } = req.query;
    let apiUrl = "";

    if (type === "search" && q) {
      apiUrl = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        q
      )}&lang=en&country=in&max=10&page=1&token=${process.env.API_KEY}`;
    } else {
      apiUrl = `https://gnews.io/api/v4/top-headlines?category=${
        category || "general"
      }&lang=en&country=in&max=10&page=1&token=${process.env.API_KEY}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.get("/", (req, res) => {
  res.send("Proxy server is running fine 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

export default app;

