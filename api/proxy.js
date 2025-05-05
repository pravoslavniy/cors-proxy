export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }
  
    const targetUrl = req.query.url;
  
    if (!targetUrl) {
      res.status(400).json({ error: "Missing target URL in query (?url=...)" });
      return;
    }
  
    try {
      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          "Content-Type": req.headers["content-type"] || "application/x-www-form-urlencoded",
        },
        body: req.method === "POST" ? req.body : undefined,
      });
  
      const text = await response.text();
      res.status(response.status).send(text);
    } catch (err) {
      res.status(500).json({ error: "Proxy request failed", details: err.message });
    }
  }
  