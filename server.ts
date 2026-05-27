import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/codeforces/user", async (req, res) => {
    const handle = "Pritoo29";
    const apiKey = process.env.CODEFORCES_API_KEY;
    const apiSecret = process.env.CODEFORCES_API_SECRET;

    if (!apiKey || !apiSecret) {
      // Fallback to public API if keys are missing
      try {
        const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
        const data = await response.json();
        return res.json(data);
      } catch (error) {
        return res.status(500).json({ status: "FAILED", comment: "Failed to fetch from Codeforces" });
      }
    }

    const time = Math.floor(Date.now() / 1000);
    const rand = Math.floor(100000 + Math.random() * 900000).toString();
    const methodName = "user.info";
    const params = `apiKey=${apiKey}&handles=${handle}&time=${time}`;
    const text = `${rand}/${methodName}?${params}#${apiSecret}`;
    const hash = crypto.createHash("sha512").update(text).digest("hex");
    const apiSig = `${rand}${hash}`;

    const url = `https://codeforces.com/api/${methodName}?${params}&apiSig=${apiSig}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ status: "FAILED", comment: "Failed to fetch from Codeforces" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
