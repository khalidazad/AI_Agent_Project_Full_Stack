import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { agent } from "./agent/helpdeskAgent.js";
import path from "path";
import { fileURLToPath } from "url";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();   // ✅ create app first

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

/* ---------- API ROUTE ---------- */

/* API ROUTES FIRST */

app.post("/chat", async (req, res) => {
  try {
    const message = req.body?.message;

    if (!message) {
      return res.status(400).json({ error: "message required" });
    }

    const response = await agent.invoke({
      messages: [{ role: "user", content: message }]
    });

    res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Agent error" });
  }
});


/* FRONTEND STATIC FILES */

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});
/* ---------- SERVE FRONTEND ---------- */

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
 console.log(`Server started on port ${PORT}`);
});