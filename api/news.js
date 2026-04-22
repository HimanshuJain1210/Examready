export default async function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Missing query" });

  const rss = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-IN&gl=IN&ceid=IN:en`;

  try {
    const response = await fetch(rss);
    if (!response.ok) throw new Error("RSS fetch failed");
    const xml = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
