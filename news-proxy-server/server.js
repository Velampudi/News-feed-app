import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/news", async (req, res) => {
  try {
    const apiUrl = "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&page=1&token=100bcbd689b4c8efb24fc5a0245d61bc";
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
