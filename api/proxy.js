export default async function handler(req, res) {
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.status(204).end();
      return;
    }
  
    if (req.method === "POST") {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbymYo1AZ5cuXV-WnVXLJ6W-p3_qNaFsopXoEG01txpDi5As4Ec1JrZSYIXaa41cskw5/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(req.body).toString(),
          }
        );
  
        const text = await response.text();
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(text);
      } catch (err) {
        res.status(500).json({ error: "Ошибка прокси", details: err.message });
      }
    } else {
      res.status(405).send("Метод не поддерживается");
    }
  }
  